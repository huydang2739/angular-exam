import { Directive, Input } from '@angular/core'
import { MetadataService } from './metadata.service'
import { shorten } from '../../utils/common'

@Directive({
  selector: '[metadata]'
})
export class MetadataDirective {
  @Input() set pageTitle(value: string) {
    this.metadataService.setTitle(value)
    this.metadataService.setTag({ name: 'og:title', content: value })
  }

  @Input() set description(value: string) {
    this.metadataService.setTag({ name: 'description', content: shorten(value, 160) })
    this.metadataService.setTag({ name: 'og:description', content: shorten(value, 160) })
  }

  @Input() set ogImage(value: string) {
    this.metadataService.setTag({ name: 'og:image', content: value })
  }

  constructor(private metadataService: MetadataService) { }

}
