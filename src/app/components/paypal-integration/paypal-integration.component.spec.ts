import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalIntegrationComponent } from './paypal-integration.component';

describe('PaypalIntegrationComponent', () => {
  let component: PaypalIntegrationComponent;
  let fixture: ComponentFixture<PaypalIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaypalIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
