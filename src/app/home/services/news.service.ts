import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Blogger, RestApiUrl } from '../../config/config';
import { BaseService } from '../../util/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getNewsItems() {
    return this.http.get(RestApiUrl.blogger.posts + Blogger.apiKey)
      .pipe(catchError(this.errorHandler))
  }
}
