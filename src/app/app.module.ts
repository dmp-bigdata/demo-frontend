import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { EchartsComponent } from './shared/echarts/echarts.component';
import { DemoComponent } from './demo/demo.component';
import { CanvasComponent } from './shared/canvas/canvas.component';
import { EchartsDemoComponent } from './demo/echarts-demo/echarts-demo.component';
import { CanvasDemoComponent } from './demo/canvas-demo/canvas-demo.component';
import { MonacoComponent } from './shared/monaco/monaco.component';
import { MonacoDemoComponent } from './demo/monaco-demo/monaco-demo.component';
import { TsChartComponent } from './shared/ts-chart/ts-chart.component';
import { TsChartDemoComponent } from './demo/ts-chart-demo/ts-chart-demo.component';
import { TsFlowDemoComponent } from './demo/ts-flow-demo/ts-flow-demo.component';
import { DataMapDemoComponent } from './demo/data-map-demo/data-map-demo.component';
import { DataMapComponent } from './shared/data-map/data-map.component';
import { TsFlowComponent } from './shared/ts-flow/ts-flow.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    EchartsComponent,
    DemoComponent,
    CanvasComponent,
    EchartsDemoComponent,
    CanvasDemoComponent,
    MonacoComponent,
    MonacoDemoComponent,
    TsChartComponent,
    TsChartDemoComponent,
    TsFlowDemoComponent,
    DataMapDemoComponent,
    DataMapComponent,
    TsFlowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
})
export class AppModule {}
