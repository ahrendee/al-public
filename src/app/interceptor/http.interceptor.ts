import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LocationUrls, RestApiUrl } from '../config/config';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.isAlApiCall(request.url)) {
      const token: string = sessionStorage.getItem('token');

      if (token) {
        request = request.clone({headers: request.headers.set('x-access-token', token)});
        // request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
      }

      if (!request.headers.has('Content-Type')) {
        request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
      }

      request = request.clone({headers: request.headers.set('Accept', 'application/json')});
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        // if (event instanceof HttpResponse) {
        //   console.log('event--->>>', event);
        // }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason: error && error.error.reason ? error.error.reason : '',
          status: error.status
        };
        console.error(data);
        return throwError(error);
      })
    );
  }

  isAlApiCall(url: string) {
    return url.indexOf(LocationUrls.apiUrl) > -1
      && url.indexOf(`${LocationUrls.apiUrl}${RestApiUrl.authenticate}`) === -1;
  }
}
