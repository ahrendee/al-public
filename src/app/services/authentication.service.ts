import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationUrls, RestApiUrl } from '../config/config';
import { BaseService } from '../util/BaseService.service';

export class AuthenticationToken {
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {

  private static token: AuthenticationToken;

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Login into the API.
   */
  authenticate() {
    const body = {
      'code': this.generateCode()
    };

    return new Promise((resolve, reject) => {
      this.http.post(LocationUrls.apiUrl + RestApiUrl.authenticate, body)
        .subscribe((data: AuthenticationToken) => {
          resolve(data);
        });
    });
  }

  generateCode() {
    const ints = new String(new Date().getTime()).substr(6, 3).split('');
    return `d4Y${ints[2]}$s${ints[1]}Umq${ints[0]}Ac%`;
  }

  getAuthToken() {
    return AuthenticationService.token;
  }
}
