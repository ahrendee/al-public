import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GigsService } from './gigs.service';

@Injectable()
export class GigsResolver implements Resolve<any> {

  constructor(private gigsService: GigsService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot) {
    return this.gigsService.getGigs();
  }
}
