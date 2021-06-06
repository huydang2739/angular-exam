import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ContentCardComponent } from './content-card/content-card.component'


import { PaginatorComponent } from './paginator/paginator.component'
import { SearchInputComponent } from './search-input/search-input.component'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HeaderComponent } from './header/header.component'
import { NoResultsComponent } from './no-results/no-results.component'
import { LoaderComponent } from './loader/loader.component'
import { ContentLoaderModule } from '@ngneat/content-loader'


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ContentLoaderModule,
    ReactiveFormsModule
  ],
  declarations: [
    ContentCardComponent,
    HeaderComponent,
    NoResultsComponent,
    PaginatorComponent,
    SearchInputComponent,
    LoaderComponent,
  ],
  exports: [
    ContentCardComponent,
    HeaderComponent,
    NoResultsComponent,
    PaginatorComponent,
    SearchInputComponent,
    LoaderComponent,
  ]
})
export class SharedModule { }
