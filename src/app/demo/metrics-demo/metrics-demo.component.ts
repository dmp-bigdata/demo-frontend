import { Component, OnInit } from '@angular/core';
import {
  MetricsOptions,
  MetricsTheme,
} from '../../shared/metrics/metrics.model';

@Component({
  selector: 'app-metrics-demo',
  templateUrl: './metrics-demo.component.html',
  styleUrls: ['./metrics-demo.component.scss'],
})
export class MetricsDemoComponent implements OnInit {
  options1: MetricsOptions = {
    label: '年营业额',
    value: '72.6',
    unit: '亿元',
    mode: 'block'
  };
  options2: MetricsOptions = {
    label: '年营业额',
    value: '72.6',
    unit: '亿元',
    mode: 'block-2'
  };
  options3: MetricsOptions = {
    label: '年营业额(亿元)',
    value: '72.6',
    unit: '亿元',
    mode: 'block-3'
  };
  options4: MetricsOptions = {
    label: '年营业额',
    value: '72.6',
    unit: '亿元',
    mode: 'inline',
  };
  options5: MetricsOptions = {
    label: '年营业额(亿元):',
    value: '72.6',
    mode: 'inline',
  };
  theme1: MetricsTheme = {
    style: {
      common: 'border:1px solid #ccc; padding:5px; margin:15px;',
      label: 'color:blue',
      value: 'color:red;',
    },
  };
  theme2: MetricsTheme = {
    style: {
      common: 'border:1px solid #ccc; padding:5px; margin:15px;',
      label: 'color:blue',
      value: 'color:red;',
    },
  };
  theme3: MetricsTheme = {
    style: {
      common: 'border:1px solid #ccc; padding:5px; margin:15px;',
      label: 'color:blue',
      value: 'color:red;',
    },
  };
  theme4: MetricsTheme = {
    style: {
      common: 'border:1px solid #ccc; padding:5px; margin:15px;',
      label: 'color:blue',
      value: 'color:red; padding-left:5px;',
    },
  };
  theme5: MetricsTheme = {
    style: {
      common: 'border:1px solid #ccc; padding:5px; margin:15px;',
      label: 'color:blue',
      value: 'color:red; padding-left:5px;',
    },
  };
  constructor() {}

  ngOnInit(): void {}
}
