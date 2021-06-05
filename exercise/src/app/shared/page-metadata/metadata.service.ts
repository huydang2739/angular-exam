import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PageMetadataOptions } from './page-metadata.options';

export interface MetadataTag {
  name: string
  content: string
}

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private options: PageMetadataOptions,
  ) {
    this.setDefault()
  }

  setTitle(newTitle: string) {
    if (!newTitle || newTitle.length === 0) {
      newTitle = this.options && this.options.defaultPageTitle
    }
    const suffix = this.options && this.options.pageSuffix
    this.titleService.setTitle([newTitle, suffix].filter(t => !!t).join(' - '))
  }

  setTags(tags: MetadataTag[]) {
    tags.forEach(tag => {
      this.setTag(tag)
    })
  }

  setTag(tag: MetadataTag) {
    this.metaService.removeTag(`name='${tag.name}'`)
    this.metaService.addTag({ name: tag.name, content: tag.content })
  }

  private setDefault() {
    this.setTitle('')
    this.setTags([
      { name: 'description', content: this.options && this.options.defaultPageDescription },
    ])
  }
}
