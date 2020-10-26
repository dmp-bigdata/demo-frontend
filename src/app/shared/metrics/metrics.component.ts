import { Component, Input, OnInit } from '@angular/core';
import { MetricsOptions, MetricsTheme } from './metrics.model';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit {
  @Input()
  options: MetricsOptions;

  @Input()
  theme: MetricsTheme;
  constructor() {}

  ngOnInit(): void {}
}
