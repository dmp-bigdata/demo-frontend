import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Canvas2DApplication } from './gui-2d';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.less'],
})
export class CanvasComponent implements AfterViewInit, OnInit {
  // canvas
  @ViewChild('canvas1')
  public canvasRef: ElementRef;
  public application: Canvas2DApplication;

  ngAfterViewInit(): void {
    this.application = new Canvas2DApplication(this.canvasRef.nativeElement);
    this.application.start();
    const data = {
      width: 900,
      height: 500,
      maxValue: 30,
      xAxis: ['0星', '1星', '2星', '3星', '4星', '5星', '待审核'],
      starRate: [0, 2, 5, 15, 23, 26, 30],
      starNum: [0, 3, 8, 12, 15, 16, 20],
      rectColor: [
        '#b5cb85',
        '#b5cb85',
        '#b5cb85',
        '#b5cb85',
        '#b5cb85',
        '#b5cb85',
        '#b5cb85',
      ],
    };
  }
  ngOnInit(): void {}
  start(): void {
    this.application.start();
  }
  stop(): void {
    this.application.stop();
  }
}
