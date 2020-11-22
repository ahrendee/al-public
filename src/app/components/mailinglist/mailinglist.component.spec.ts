import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { MailinglistComponent } from './mailinglist.component';

describe('MailinglistComponent', () => {
  let component: MailinglistComponent;
  let fixture: ComponentFixture<MailinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MailinglistComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
