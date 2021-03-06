import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }).compileComponents());

  it('should be created', () => {
    const service: MenuService = TestBed.get(MenuService);
    expect(service).toBeTruthy();
  });
});
