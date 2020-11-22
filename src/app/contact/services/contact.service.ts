import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationUrls, RestApiUrl } from '../../config/config';
import { AuthenticationService } from '../../services/authentication.service';
import { BaseService } from '../../util/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService {

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
    super();
  }

  send(data: any) {
    return new Observable((observer) => {

      // then we update the list with the data from the back-end
      this.http.post(LocationUrls.apiUrl + RestApiUrl.contact, data).subscribe((result) => {
        observer.next(result);
      });
    });
  }
}
