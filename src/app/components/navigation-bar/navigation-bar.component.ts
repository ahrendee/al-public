import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Input() page: string;

  menuItems: any[];

  constructor(private menuService: MenuService) {
    this.menuService.getMenuItems().subscribe((data: any[]) => {
      this.menuItems = data;
    });
  }

  ngOnInit() {
  }
}
