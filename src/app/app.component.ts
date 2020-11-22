import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { increment10 } from './components/counter/counter.actions';
import { LocationUrls, RestApiUrl } from './config/config';
import { GigsService } from './gigs/services/gigs.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'August Life';

  constructor(private store: Store<{ counter: number }>,
              private http: HttpClient,
              private auth: AuthenticationService,
              private router: Router) {

    // get JWT token from server
    this.auth.authenticate().then((result: any) => {
      sessionStorage.setItem('token', result.token);

      if (!this.router.isActive('gigs', true)) {
        console.log('waking up backend');
        // then we update the list with the data from the back-end
        this.http.get(LocationUrls.apiUrl + RestApiUrl.gigs).subscribe((data) => {
          console.log('initial gigs load in cache');
          GigsService.cache = data;
        });
      }
    });

    this.store.dispatch(increment10());
  }
}
