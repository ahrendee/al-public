import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationUrls, RestApiUrl } from '../../config/config';
import { AuthenticationService } from '../../services/authentication.service';
import { BaseService } from '../../util/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class GigsService extends BaseService {

  static cache: any = [{
    venue: 'loading gigs...'
  }];

  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient) {
    super();
  }

  getGigs() {
    return new Observable((observer) => {
      // first we show the cached shows
      observer.next(GigsService.cache);

      // then we update the list with the data from the back-end
      this.http.get(LocationUrls.apiUrl + RestApiUrl.gigs).subscribe((data) => {
        GigsService.cache = data;
        observer.next(data);
      });
    });
  }
}
