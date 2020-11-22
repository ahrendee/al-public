import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, reduce } from 'rxjs/operators';
import { LocationUrls, RestApiUrl } from '../../config/config';
import { BaseService } from '../../util/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getEuCountries() {
    return this.http.get(RestApiUrl.countries_eu)
      .pipe(catchError(this.errorHandler));
  }

  getAllCountries() {
    return this.http.get(RestApiUrl.countries_all)
      .pipe(catchError(this.errorHandler))
  }
}
