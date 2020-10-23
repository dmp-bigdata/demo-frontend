import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ts-chart',
  templateUrl: './ts-chart.component.html',
  styleUrls: ['./ts-chart.component.less'],
})
export class TsChartComponent implements OnInit {
  @ViewChild('chartContainer', { static: true })
  chartContainer: ElementRef;

  constructor() {}

  ngOnInit(): void {}
}
