import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogImageComponent } from './dog-image/dog-image.component';
import { CatImageComponent } from './cat-image/cat-image.component';
import { MainRoutes } from './main.routing';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    MainRoutes,
    SharedModule
  ],
  declarations: [
    DogImageComponent,
    CatImageComponent
  ]
})
export class MainModule { }
