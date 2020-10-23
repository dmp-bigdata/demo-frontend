import { Component } from '@angular/core';

@Component({
  selector: 'app-monaco-demo',
  templateUrl: './monaco-demo.component.html',
  styleUrls: ['./monaco-demo.component.less'],
})
export class MonacoDemoComponent {
  options = {
    value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
    language: 'javascript',
  };
  code = {
    value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
  };
  constructor() {}
}
