import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixflixComponent } from './pixflix.component';

describe('PixflixComponent', () => {
  let component: PixflixComponent;
  let fixture: ComponentFixture<PixflixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PixflixComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixflixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
