import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpkComponent } from './epk.component';

describe('EpkComponent', () => {
  let component: EpkComponent;
  let fixture: ComponentFixture<EpkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpkComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
