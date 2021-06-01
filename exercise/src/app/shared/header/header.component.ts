import { Component, Input, OnInit } from '@angular/core';
import { Items, TabItems } from './Router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  listItemsRouter = Items
  listTabItems = TabItems
  constructor() { }

  ngOnInit() {
  }

}
