import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { GetImageService } from 'src/app/api/get-image.service'
import { PreloadModuleService } from 'src/app/services/preload-module.service'
import { ListContainer } from 'src/app/shared/list-container'

import { Image } from 'src/app/types/model'

@Component({
  selector: 'app-dog-image',
  templateUrl: './animals-image.component.html',
  styleUrls: ['./animals-image.component.scss']
})
export class AnimalsImageComponent extends ListContainer<Image> implements OnInit {
  isLoading = true

  constructor(
    route: ActivatedRoute,
    router: Router,
    private getImageService: GetImageService,
    private preloadModuleService: PreloadModuleService
  ) {
    super(route, router, 8)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.preloadModuleService.startPreload('course')
    }, 150)
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
