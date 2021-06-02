import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogImageComponent } from './dog-image/dog-image.component';
import { CatImageComponent } from './cat-image/cat-image.component';
import { MainRoutes } from './main.routing';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';
import { AccordionModule } from 'ngx-bootstrap/accordion'


@NgModule({
  imports: [
    CommonModule,
    MainRoutes,
    SharedModule,
    AccordionModule.forRoot(),
  ],
  declarations: [
    DogImageComponent,
    CatImageComponent,
    MainComponent
  ]
})
export class MainModule { }
