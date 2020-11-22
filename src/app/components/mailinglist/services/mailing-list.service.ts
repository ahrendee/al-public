import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationUrls, RestApiUrl } from '../../../config/config';
import { AuthenticationService } from '../../../services/authentication.service';
import { HttpService } from '../../../services/http.service';
import { BaseService } from '../../../util/BaseService.service';

@Injectable({
  providedIn: 'root'
})
export class MailingListService extends BaseService {

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService,
              private httpService: HttpService) {
    super();
  }

  addMailingListEntry(entry: any) {
    return new Observable((observer) => {

      this.http.post(LocationUrls.apiUrl + RestApiUrl.mailingList, entry)
        .subscribe((result) => {
          observer.next(result);
        });
    });
  }

  getMailingListEntryByEmail(email: string) {
    return new Observable((observer) => {

      this.http.get(LocationUrls.apiUrl + RestApiUrl.mailingList + `/${email}`)
        .subscribe((result) => {
          observer.next(result);
        });
    });
  }
}
