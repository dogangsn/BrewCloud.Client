/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FarmclientaddComponent } from './farmclientadd.component';

describe('FarmclientaddComponent', () => {
  let component: FarmclientaddComponent;
  let fixture: ComponentFixture<FarmclientaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmclientaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmclientaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
