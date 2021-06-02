import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/shared/types/model'
@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent implements OnInit {
  @Input() content: Image
  constructor() { }

  ngOnInit() {
  }

}
