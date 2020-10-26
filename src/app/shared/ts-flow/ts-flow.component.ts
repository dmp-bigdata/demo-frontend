import { Component, Input, OnInit } from '@angular/core';
import { TsFlowOptions } from './ts-flow.model';

@Component({
  selector: 'app-ts-flow',
  templateUrl: './ts-flow.component.html',
  styleUrls: ['./ts-flow.component.less'],
})
export class TsFlowComponent implements OnInit {
  @Input()
  options: TsFlowOptions;
  @Input()
  width = '300px';
  @Input()
  height = '300px';
  constructor() {}

  ngOnInit(): void {}
}
