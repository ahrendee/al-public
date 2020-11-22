import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() page;
  home: boolean = false;

  constructor() {
  }

  ngOnInit() {
    if (this.page === 'Welcome to the New Eternity') {
      this.home = true;
    }
  }

}
