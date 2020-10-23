import { Application, CanvasKeyBoardEvent, CanvasMouseEvent } from './gui-core';

export class WebGLApplication extends Application {
  context3d: WebGL2RenderingContext | null;
  constructor(
    public canvas: HTMLCanvasElement,
    public options?: WebGLContextAttributes
  ) {
    super(canvas);
    this.context3d = this.canvas.getContext('webgl2', options);
  }
  dispatchKeyUp(evt: CanvasKeyBoardEvent): void {
    console.log('render');
  }
  dispatchKeyDown(evt: CanvasKeyBoardEvent): void {
    console.log('render');
  }
  dispatchKeyPress(evt: CanvasKeyBoardEvent): void {
    throw new Error('Method not implemented.');
  }
  dispatchMouseDrag(evt: CanvasMouseEvent): void {
    throw new Error('Method not implemented.');
  }
  dispatchMouseMove(evt: CanvasMouseEvent): void {
    throw new Error('Method not implemented.');
  }
  dispatchMouseUp(evt: CanvasMouseEvent): void {
    throw new Error('Method not implemented.');
  }
  dispatchMouseDown(evt: CanvasMouseEvent): void {
    throw new Error('Method not implemented.');
  }
  update(timestamp: number, elapseMsec: number, intervalMsec: number): void {
    throw new Error('Method not implemented.');
  }
  render(): void {
    throw new Error('Method not implemented.');
  }
}
