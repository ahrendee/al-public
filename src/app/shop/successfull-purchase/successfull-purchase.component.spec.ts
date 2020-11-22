import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullPurchaseComponent } from './successfull-purchase.component';

describe('SuccessfullPurchaseComponent', () => {
  let component: SuccessfullPurchaseComponent;
  let fixture: ComponentFixture<SuccessfullPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfullPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfullPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
