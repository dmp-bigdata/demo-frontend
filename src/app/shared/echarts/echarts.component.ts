import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';
import { EChartOption, ECharts, EChartsResponsiveOption } from 'echarts';

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.less'],
})
export class EchartsComponent implements AfterViewInit, OnChanges {
  @ViewChild('container')
  public containerDom: ElementRef;
  @Input()
  options: EChartOption | EChartsResponsiveOption;
  @Input()
  width = '300px';
  @Input()
  height = '300px';
  myChart: ECharts;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.myChart) {
      this.myChart.setOption(this.options);
    }
  }
  ngAfterViewInit(): void {
    this.myChart = echarts.init(this.containerDom.nativeElement);
    this.myChart.setOption(this.options);
  }
}
