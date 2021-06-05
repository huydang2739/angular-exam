import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetImageService } from 'src/app/api/get-image.service';
import { ListContainer } from 'src/app/shared/list-container';

import { Image } from 'src/app/types/model'

@Component({
  selector: 'app-foods-image',
  templateUrl: './foods-image.component.html',
  styleUrls: ['./foods-image.component.scss']
})
export class FoodsImageComponent extends ListContainer<Image> implements OnInit {
  constructor(
    route: ActivatedRoute,
    router: Router,
    private getImageService: GetImageService,
  ) {
    super(route, router, 8)
  }

  protected fetch() {
    const { page1, quantity } = this
    const page = page1
    const limit = quantity
    const search = this.query
    return this.getImageService.getFoodImage({ page, limit, search })
  }

  protected handleError(reason: any) {
    console.log('Error')
  }

}
