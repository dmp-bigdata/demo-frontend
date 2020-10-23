import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsChartDemoComponent } from './ts-chart-demo.component';

describe('TsChartDemoComponent', () => {
  let component: TsChartDemoComponent;
  let fixture: ComponentFixture<TsChartDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsChartDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsChartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
