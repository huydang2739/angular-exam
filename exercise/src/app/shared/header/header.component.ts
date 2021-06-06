import { Component, Input, OnInit } from '@angular/core';
import { MenuItems, TabItems } from './Router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  listMenuItems = MenuItems
  listTabItems = TabItems
  constructor() { }

  ngOnInit() {
  }

}
