import { TestBed } from '@angular/core/testing';

import { ShoppingBasketService } from './shopping-basket.service';

describe('ShoppingBasketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingBasketService = TestBed.get(ShoppingBasketService);
    expect(service).toBeTruthy();
  });
});
