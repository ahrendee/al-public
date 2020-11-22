import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GigsService } from './gigs.service';

describe('GigsService', () => {
  let gigsService: GigsService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    }).compileComponents());

  it('should be created', () => {
    const service: GigsService = TestBed.get(GigsService);
    expect(service).toBeTruthy();
  });
});
