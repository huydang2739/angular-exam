import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ContentCardComponent } from './content-card/content-card.component'

import { NoResultComponent } from './no-result/no-result.component'
import { PaginatorComponent } from './paginator/paginator.component'
import { SearchInputComponent } from './search-input/search-input.component'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { HeaderComponent } from './header/header.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FormsModule,
  ],
  declarations: [
    ContentCardComponent,
    HeaderComponent,
    NoResultComponent,
    PaginatorComponent,
    SearchInputComponent,
  ],
  exports: [
    ContentCardComponent,
    HeaderComponent,
    NoResultComponent,
    PaginatorComponent,
    SearchInputComponent
  ]
})
export class SharedModule { }
