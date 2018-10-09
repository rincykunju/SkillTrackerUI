/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddAssociatePageComponent } from './add-associate-page.component';

describe('AddAssociatePageComponent', () => {
  let component: AddAssociatePageComponent;
  let fixture: ComponentFixture<AddAssociatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssociatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssociatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
