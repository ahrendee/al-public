import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationUrls, RestApiUrl } from '../../config/config';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpService } from '../../services/http.service';
import { BaseService } from '../../util/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService,
              private httpService: HttpService) {
    super();
  }

  saveOrder(order: any) {
    return new Observable((observer) => {

      this.http.post(LocationUrls.apiUrl + RestApiUrl.orders, order)
        .subscribe((result) => {
          observer.next(result);
        });
    });
  }
}
