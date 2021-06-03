import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { GetImageService } from 'src/app/api/get-image.service'
import { ListContainer } from 'src/app/shared/list-container'

import { Image } from 'src/app/shared/types/model'

@Component({
  selector: 'app-dog-image',
  templateUrl: './dog-image.component.html',
  styleUrls: ['./dog-image.component.scss']
})
export class DogImageComponent extends ListContainer<Image> implements OnInit {
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
    return this.getImageService.getAnimalImage({ page, limit, search })
  }

  protected handleError(reason: any) {
    console.log('Error')
  }

}
