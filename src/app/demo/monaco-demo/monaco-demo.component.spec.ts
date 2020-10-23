import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonacoDemoComponent } from './monaco-demo.component';

describe('MonacoDemoComponent', () => {
  let component: MonacoDemoComponent;
  let fixture: ComponentFixture<MonacoDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonacoDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonacoDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
