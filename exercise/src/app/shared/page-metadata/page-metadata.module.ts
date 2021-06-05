import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PageMetadataOptions } from './page-metadata.options'
import { MetadataDirective } from './metadata.directive'
import { MetadataService } from './metadata.service'



@NgModule({
  declarations: [
    MetadataDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MetadataDirective,
  ],
  providers: [
    MetadataService,
  ]
})
export class PageMetadataModule {
  static forRoot(options: PageMetadataOptions = {}): ModuleWithProviders {
    return {
      ngModule: PageMetadataModule,
      providers: [
        {
          provide: PageMetadataOptions,
          useValue: options
        }
      ]
    }
  }
}
