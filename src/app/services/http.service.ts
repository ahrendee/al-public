import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private authenticationService: AuthenticationService) {
  }

  prepareHttpOptions() {
    console.log(this.authenticationService.getAuthToken().token);
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': this.authenticationService.getAuthToken().token
      })
    };
    console.log(JSON.stringify(httpOptions));
    return httpOptions;
  }
}
