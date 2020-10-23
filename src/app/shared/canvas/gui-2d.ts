import { Application, CanvasKeyBoardEvent, CanvasMouseEvent } from './gui-core';

export class Canvas2DApplication extends Application {
  context2D: CanvasRenderingContext2D | null;
  private lineDashOffset = 0;
  private lineGradient: CanvasGradient;
  private radialGradient: CanvasGradient;
  private pattern: any;
  constructor(
    public canvas: HTMLCanvasElement,
    public options?: CanvasRenderingContext2DSettings
  ) {
    super(canvas);
    this.context2D = this.canvas.getContext('2d', options);
    if (this.context2D) {
      console.log(
        this.context2D.lineCap,
        this.context2D.lineWidth,
        this.context2D.lineJoin,
        this.context2D.miterLimit
      );
    }
  }
  dispatchKeyUp(evt: CanvasKeyBoardEvent): void {
    console.log('dispatchKeyUp', evt);
  }
  dispatchKeyDown(evt: CanvasKeyBoardEvent): void {
    console.log('dispatchKeyDown', evt);
  }
  dispatchKeyPress(evt: CanvasKeyBoardEvent): void {
    console.log('dispatchKeyPress', evt);
  }
  dispatchMouseDrag(evt: CanvasMouseEvent): void {
    console.log('dispatchMouseDrag', evt);
  }
  dispatchMouseMove(evt: CanvasMouseEvent): void {
    console.log('dispatchMouseMove', evt);
  }
  dispatchMouseUp(evt: CanvasMouseEvent): void {
    console.log('dispatchMouseUp', evt);
  }
  dispatchMouseDown(evt: CanvasMouseEvent): void {
    console.log('dispatchMouseDown', evt);
  }
  update(timestamp: number, elapseMsec: number, intervalMsec: number): void {
    // console.log('update', timestamp, elapseMsec, intervalMsec);
    this.updateLineDashOffset();
  }
  render(): void {
    if (this.context2D) {
      //  渲染前需要先清屏
      this.context2D.clearRect(
        0,
        0,
        this.context2D.canvas.width,
        this.context2D.canvas.height
      );
      this.drawRect(30, 30, 150, 170);
      this.fillCircle(200, 200, 50, this.pattern);
      this.strokeGrid();
      this.fillText('context2D', 250, 50, 'red');
    }
  }

  private updateLineDashOffset(): void {
    this.lineDashOffset += 1;
    if (this.lineDashOffset > 10000) {
      this.lineDashOffset = 0;
    }
  }

  private drawRect(x: number, y: number, w: number, h: number): void {
    if (this.context2D) {
      if (!this.lineGradient) {
        // 线性渐变
        this.lineGradient = this.context2D.createLinearGradient(x, y, x + w, y);
        this.lineGradient.addColorStop(0.0, 'grey');
        this.lineGradient.addColorStop(0.95, 'rgba(255,0,0,1)');

        // 放射渐变
        const centerX = x + w * 0.5;
        const centerY = x + h * 0.5;
        const radius = Math.min(w, h) * 0.5;
        this.radialGradient = this.context2D.createRadialGradient(
          centerX,
          centerY,
          radius * 0.6,
          centerX,
          centerY,
          radius
        );
        this.radialGradient.addColorStop(0, 'black');
        this.radialGradient.addColorStop(0.05, 'red');
        this.radialGradient.addColorStop(0.5, 'green');
        this.radialGradient.addColorStop(0.75, 'blue');
        this.radialGradient.addColorStop(1, 'white');
        // 图片
        const img = document.createElement('img') as HTMLImageElement;
        img.src = '/assets/ss3.jpg';
        img.onload = (evt: Event) => {
          this.pattern = this.context2D.createPattern(img, 'no-repeat');
          this.drawRect(x, y, w, h);
        };
        return;
      }
      // 先保存状态，用完，恢复原来状态
      this.context2D.save();
      this.context2D.fillStyle = this.pattern;
      this.context2D.strokeStyle = 'blue';
      this.context2D.lineWidth = 20;
      this.context2D.setLineDash([30, 15]);
      this.context2D.lineDashOffset = -this.lineDashOffset;
      this.context2D.beginPath();

      this.context2D.moveTo(x, y);
      this.context2D.lineTo(x + w, y);
      this.context2D.lineTo(x + w, y + h);
      this.context2D.lineTo(x, y + h);

      this.context2D.closePath();
      this.context2D.fill();
      this.context2D.stroke();

      this.context2D.restore();
    }
  }

  private fillCircle(
    x: number,
    y: number,
    radius: number,
    fillStyle: string | CanvasGradient | CanvasPattern = 'red'
  ): void {
    if (this.context2D) {
      this.context2D.save();
      this.context2D.fillStyle = fillStyle;
      this.context2D.beginPath();
      this.context2D.arc(x, y, radius, 0, Math.PI * 2);
      this.context2D.fill();
      // this.context2D.closePath();
      this.context2D.restore();
    }
  }
  // 没有进行状态的save / restore操作
  // 也没有任何的修改渲染属性
  // 纯粹stroke操作
  // 这是因为这个方法被其他方法多次调用，由调用方进行状态管理和状态设置
  // （参考strokeCoord和strokeGrid方法）
  // 要记住本方法并没有进行状态管理和状态修改
  public strokeLine(x0: number, y0: number, x1: number, y1: number): void {
    if (this.context2D) {
      // 一定要调用beginPath方法
      this.context2D.beginPath();
      this.context2D.moveTo(x0, y0);
      this.context2D.lineTo(x1, y1);
      this.context2D.stroke();
    }
  }
  public strokeCoordinate(
    originX: number,
    originY: number,
    width: number,
    height: number
  ): void {
    if (this.context2D) {
      this.context2D.save();
      // 红色为x轴
      this.context2D.strokeStyle = 'red';
      this.strokeLine(originX, originY, originX + width, originY);
      // 蓝色为y轴
      this.context2D.strokeStyle = 'blue';
      this.strokeLine(originX, originY, originX, originY + height);
      this.context2D.restore();
    }
  }
  // 其中参数interval控制每个网格横向和纵向的间隔大小
  public strokeGrid(color: string = 'grey', interval: number = 10): void {
    if (this.context2D) {
      this.context2D.save();
      this.context2D.strokeStyle = color;
      this.context2D.lineWidth = 0.5;
      // 从左到右每隔interval个像素画一条垂直线
      for (
        let i: number = interval + 0.5;
        i < this.canvas.width;
        i += interval
      ) {
        this.strokeLine(i, 0, i, this.canvas.height);
      }

      // 从上到下每隔interval个像素画一条水平线
      for (
        let i: number = interval + 0.5;
        i < this.canvas.height;
        i += interval
      ) {
        this.strokeLine(0, i, this.canvas.width, i);
      }
      this.context2D.restore();

      // 绘制网格背景全局坐标系的原点
      this.fillCircle(0, 0, 5, 'green');
      // 为网格背景绘制全局坐标系
      // Canvas中全局坐标系的原点在左上角，并且x轴总是指向右侧，y轴指向下方
      // 全局坐标系永远不会变换，总是固定的
      this.strokeCoordinate(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  public fillText(
    text: string,
    x: number,
    y: number,
    color: string = 'white',
    align: TextAlign = 'left',
    baseline: TextBaseline = 'top',
    font: FontType = '10px sans-serif'
  ): void {
    if (this.context2D) {
      // 管理渲染属性经典模式
      this.context2D.save();
      this.context2D.textAlign = align;
      // 文字左右对齐方式，类型为TextAlign
      this.context2D.textBaseline = baseline;
      // 文字上下对齐方式，类型为TextBaseline
      this.context2D.font = font; // 使用哪种字体，多少大小绘制
      this.context2D.fillStyle = color; // 文字填充的颜色
      this.context2D.fillText(text, x, y);
      // 调用fillText()函数，指定文字要绘制的坐标
      this.context2D.restore(); // 状态恢复
    }
  }
}

// Canvas2D中TextAlign用于设置文字左右如何对齐，默认情况下是start
type TextAlign = 'start' | 'left' | 'center' | 'right' | 'end';
//  Canvas2D中TextBaseline用于设置当前绘制文本的基线，默认情况下是alphabetic
//  可以认为用来设置文字是如何对齐的
type TextBaseline = 'alphabetic' | 'hanging' | 'top' | 'middle' | 'bottom';
// 字体大小和字体类型，默认情况下是10px sans - serif
// 设置15px和20px及25px大小的字体，后续代码会使用
// 利用VS Code智能感知功能，减少输入和拼写错误
type FontType =
  | '10px sans-serif'
  | '15px sans-serif'
  | '20px sans-serif'
  | '25px sans-serif';
