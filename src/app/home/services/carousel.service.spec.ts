import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CarouselService } from './carousel.service';

describe('CarouselService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }).compileComponents());

  it('should be created', () => {
    const service: CarouselService = TestBed.get(CarouselService);
    expect(service).toBeTruthy();
  });
});
