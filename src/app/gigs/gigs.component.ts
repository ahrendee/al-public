import { Component, OnInit } from '@angular/core';
import { GigsService } from './services/gigs.service';

@Component({
  selector: 'app-gigs',
  templateUrl: './gigs.component.html',
  styleUrls: ['./gigs.component.scss']
})
export class GigsComponent implements OnInit {

  upcomingGigs: any[];
  pastGigs: any[];

  constructor(private gigsService: GigsService) {

    this.gigsService.getGigs().subscribe((data: any[]) => {
      let gigs = data;
      this.upcomingGigs = [];
      this.pastGigs = [];
      gigs.forEach((gig) => {
        if (!gig.hide) {
          if ((this.getDate(new Date(gig.date)) >= this.getDate(new Date())) || gig.postponed) {
            this.upcomingGigs.push(gig);
          } else {
            this.pastGigs.push(gig);
          }
        }
      });
      // sort the gigs by date;
      this.upcomingGigs.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1);
      this.pastGigs.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1);
    });
  }

  getDate(date: Date) {
    return date.getFullYear() + '' +
      (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
      (date.getDay() < 10 ? '0' + date.getDay() : date.getDay());
  }

  ngOnInit() {
  }
}
