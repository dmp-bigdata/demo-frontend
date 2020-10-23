import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsFlowDemoComponent } from './ts-flow-demo.component';

describe('TsFlowDemoComponent', () => {
  let component: TsFlowDemoComponent;
  let fixture: ComponentFixture<TsFlowDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsFlowDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsFlowDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
