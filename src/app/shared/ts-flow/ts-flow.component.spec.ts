import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsFlowComponent } from './ts-flow.component';

describe('TsFlowComponent', () => {
  let component: TsFlowComponent;
  let fixture: ComponentFixture<TsFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
