import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { RestApiUrl } from '../../config/config';
import { BaseService } from '../../util/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getArticles() {
    return this.http.get(RestApiUrl.articles)
      .pipe(catchError(this.errorHandler));
  }
}
