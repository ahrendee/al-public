import { TestBed } from '@angular/core/testing';

import { PayPalService } from './pay-pal.service';

describe('PayPalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayPalService = TestBed.get(PayPalService);
    expect(service).toBeTruthy();
  });
});
