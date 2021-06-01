import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { GetImageService } from 'src/app/api/get-image.service'
import { ListContainer } from 'src/app/shared/list-container'

import { Image } from 'src/app/types/model'

@Component({
  selector: 'app-dog-image',
  templateUrl: './dog-image.component.html',
  styleUrls: ['./dog-image.component.scss']
})
export class DogImageComponent extends ListContainer<Image>  {

  constructor(
    route: ActivatedRoute,
    router: Router,
    private getImageService: GetImageService,
  ) {
    super(route, router, 8)
  }

  protected fetch() {
    const { page, quantity } = this
    const skip = (page - 1) * quantity
    const take = quantity
    const query = this.query
    return this.getImageService.getAnimalImage({ skip, take, query })
  }

  protected handleError(reason: any) {
    console.log('Error')
  }

}
