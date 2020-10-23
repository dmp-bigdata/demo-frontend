import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsChartComponent } from './ts-chart.component';

describe('TsChartComponent', () => {
  let component: TsChartComponent;
  let fixture: ComponentFixture<TsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
