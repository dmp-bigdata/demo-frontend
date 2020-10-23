export abstract class Application implements EventListenerObject {
  public isStart: boolean;
  public requestId: number;
  public fps = 0;
  public lastTime: number;
  public startTime: number;
  public count = 0;

  // event
  public isSupportMouseMove: boolean;
  protected isMouseDown: boolean;

  // timer
  private timers: Timer[] = [];

  constructor(public canvas: HTMLCanvasElement) {
    this.canvas.addEventListener('mousedown', this, false);
    this.canvas.addEventListener('mouseup', this, false);
    this.canvas.addEventListener('mousemove', this, false);
    window.addEventListener('keydown', this, false);
    window.addEventListener('keyup', this, false);
    window.addEventListener('keypress', this, false);
    this.isSupportMouseMove = false;
    this.isMouseDown = false;
  }
  handleEvent(evt: Event): void {
    switch (evt.type) {
      case 'mousedown':
        this.isMouseDown = true;
        this.dispatchMouseDown(this.toCanvasMouseEvent(evt));
        break;
      case 'mouseup':
        this.isMouseDown = false;
        this.dispatchMouseUp(this.toCanvasMouseEvent(evt));
        break;
      case 'mousemove':
        if (this.isSupportMouseMove) {
          this.dispatchMouseMove(this.toCanvasMouseEvent(evt));
        }
        if (this.isMouseDown) {
          this.dispatchMouseDrag(this.toCanvasMouseEvent(evt));
        }
        break;
      case 'keypress':
        this.dispatchKeyPress(this.toCanvasKeyBoardEvent(evt));
        break;
      case 'keydown':
        this.dispatchKeyDown(this.toCanvasKeyBoardEvent(evt));
        break;
      case 'keyup':
        this.dispatchKeyUp(this.toCanvasKeyBoardEvent(evt));
        break;
    }
  }
  abstract dispatchKeyUp(evt: CanvasKeyBoardEvent): void;
  abstract dispatchKeyDown(evt: CanvasKeyBoardEvent): void;
  abstract dispatchKeyPress(evt: CanvasKeyBoardEvent): void;
  abstract dispatchMouseDrag(evt: CanvasMouseEvent): void;
  abstract dispatchMouseMove(evt: CanvasMouseEvent): void;
  abstract dispatchMouseUp(evt: CanvasMouseEvent): void;
  abstract dispatchMouseDown(evt: CanvasMouseEvent): void;

  public start(): void {
    if (!this.isStart) {
      this.isStart = true;
      this.requestId = window.requestAnimationFrame((t): void => this.step(t));
    } else {
      console.log('application start again');
    }
  }
  public stop(): void {
    if (this.isStart) {
      cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
      this.lastTime = undefined;
      this.startTime = undefined;
      this.isStart = false;
    }
  }
  public isRunning(): boolean {
    return this.isStart;
  }

  private step(timestamp: number): void {
    if (!this.lastTime) {
      this.lastTime = timestamp;
    }
    if (!this.startTime) {
      this.startTime = timestamp;
    }
    const elapsedMsec = timestamp - this.startTime;
    const intervalMsec = timestamp - this.lastTime;

    this.lastTime = timestamp;
    this.count++;
    // console.log(
    //   `count:${this.count}, elapsedMsec:${elapsedMsec}, intervalMsec:${intervalMsec}`,
    //   intervalMsec / 1000.0
    // );
    if (intervalMsec !== 0) {
      this.fps = 1000 / intervalMsec;
    }
    this.handleTimers(intervalMsec);
    this.update(timestamp, elapsedMsec, intervalMsec);
    this.render();
    this.requestId = requestAnimationFrame((t): void => this.step(t));
  }

  /**
   * 更新图形位置
   * @param timestamp 当前时间 = current
   * @param elapseMsec 持续时间 = current - start
   * @param intervalMsec 间隔时间 = current - last
   */
  public abstract update(
    timestamp: number,
    elapseMsec: number,
    intervalMsec: number
  ): void;
  /**
   * 渲染
   */
  public abstract render(): void;
  private viewportToCanvasCoordinate(evt: MouseEvent): vec2 {
    if (this.canvas) {
      const rect = this.canvas.getBoundingClientRect();
      if (evt.type === 'mousedown') {
        console.log(`BoundingClientRect:${JSON.stringify(rect)}`);
        console.log(`clientX:${evt.clientX}, clientY:${evt.clientY}`);
      }
      if (evt.target) {
        const decl = window.getComputedStyle(evt.target as HTMLElement);
        const borderLeftWidth = parseInt(decl.borderLeftWidth, 10);
        const borderTopWidth = parseInt(decl.borderTopWidth, 10);
        const paddingLeft = parseInt(decl.paddingLeft, 10);
        const paddingTop = parseInt(decl.paddingTop, 10);

        const x = evt.clientX - rect.left - borderLeftWidth - paddingLeft;
        const y = evt.clientY - rect.top - borderTopWidth - paddingTop;
        return vec2.create(x, y);
      }
    }
    throw new Error('canvas is null');
  }

  private toCanvasMouseEvent(evt: Event): CanvasMouseEvent {
    const event = evt as MouseEvent;
    const mousePosition = this.viewportToCanvasCoordinate(event);
    return new CanvasMouseEvent(
      mousePosition,
      event.button,
      event.altKey,
      event.ctrlKey,
      event.shiftKey
    );
  }

  private toCanvasKeyBoardEvent(evt: Event): CanvasKeyBoardEvent {
    const event = evt as KeyboardEvent;
    return new CanvasKeyBoardEvent(
      event.key,
      event.repeat,
      event.altKey,
      event.ctrlKey,
      event.shiftKey
    );
  }

  public removeTimer(id: number): boolean {
    const timer = this.timers.find((t) => t.id === id);
    if (timer) {
      timer.enable = false;
      return true;
    }
    return false;
  }

  public addTimer(
    callback: TimeCallback,
    timeoutSec: number = 1000,
    onlyOnce: boolean = false,
    data?: any
  ): number {
    const timer = this.timers.find((t) => t.enable === false);
    if (timer) {
      timer.enable = true;
      timer.callback = callback;
      timer.timeout = timeoutSec;
      timer.onlyOnce = onlyOnce;
      timer.callbackData = data;
      return timer.id;
    }
    const newTimer = new Timer(callback, timeoutSec, onlyOnce, data);
    this.timers.push(newTimer);
    return newTimer.id;
  }

  private handleTimers(intervalMsec: number): void {
    this.timers
      .filter((t) => t.enable)
      .map((timer) => {
        timer.countdown -= intervalMsec;
        if (timer.countdown <= 0.0) {
          timer.callback(timer.id, timer.callbackData);
          if (timer.onlyOnce) {
            this.removeTimer(timer.id);
          } else {
            timer.countdown = timer.timeout;
          }
        }
      });
  }
}

export class CanvasInputEvent {
  constructor(
    public readonly altKey: boolean = false,
    public readonly ctrlKey: boolean = false,
    public readonly shiftKey: boolean = false,
    public readonly type: InputEventType = InputEventType.MouseEvent
  ) {}
}

export class vec2 {
  constructor(public x: number, public y: number) {}
  static create(x?: number, y?: number): vec2 {
    return new vec2(x, y);
  }
}
export class CanvasMouseEvent extends CanvasInputEvent {
  public readonly localPosition: vec2;
  constructor(
    public readonly canvasPosition: vec2,
    public readonly button: number,
    public readonly altKey: boolean = false,
    public readonly ctrlKey: boolean = false,
    public readonly shiftKey: boolean = false,
    public readonly type: InputEventType = InputEventType.MouseEvent
  ) {
    super(altKey, ctrlKey, shiftKey, type);
    // TODO 坐标转换
    this.localPosition = canvasPosition;
  }
}

export class CanvasKeyBoardEvent extends CanvasInputEvent {
  constructor(
    public readonly key: string,
    public readonly repeat: boolean,
    public readonly altKey: boolean = false,
    public readonly ctrlKey: boolean = false,
    public readonly shiftKey: boolean = false
  ) {
    super(altKey, ctrlKey, shiftKey, InputEventType.KeyBoardEvent);
  }
}
export enum InputEventType {
  MouseEvent,
  MouseUp,
  MouseDown,
  MouseMove,
  MouseDrag,
  KeyBoardEvent,
  KeyUp,
  KeyDown,
  KeyPress,
}

export type TimeCallback = (id: number, data: any) => void;

class Timer {
  private static timerId = -1;
  public readonly id: number;
  // 倒计时
  public countdown = 0;

  constructor(
    public callback: TimeCallback,
    public timeout = 0,
    public onlyOnce: boolean,
    public callbackData?: any,
    public enable: boolean = true
  ) {
    this.id = ++Timer.timerId;
    this.countdown = timeout;
  }
}
