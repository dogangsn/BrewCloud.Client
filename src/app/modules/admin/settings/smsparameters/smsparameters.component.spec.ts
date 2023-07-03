/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SmsparametersComponent } from './smsparameters.component';

describe('SmsparametersComponent', () => {
  let component: SmsparametersComponent;
  let fixture: ComponentFixture<SmsparametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsparametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsparametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
