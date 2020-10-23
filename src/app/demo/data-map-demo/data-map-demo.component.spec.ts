import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMapDemoComponent } from './data-map-demo.component';

describe('DataMapDemoComponent', () => {
  let component: DataMapDemoComponent;
  let fixture: ComponentFixture<DataMapDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataMapDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMapDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
