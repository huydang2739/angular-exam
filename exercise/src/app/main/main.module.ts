import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalsImageComponent } from './animals-image/animals-image.component';
import { MainRoutes } from './main.routing';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';
import { AccordionModule } from 'ngx-bootstrap/accordion'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FoodsImageComponent } from './foods-image/foods-image.component';


@NgModule({
  imports: [
    CommonModule,
    MainRoutes,
    SharedModule,
    AccordionModule.forRoot(),
    RouterModule,
    FormsModule
  ],
  declarations: [
    AnimalsImageComponent,
    FoodsImageComponent,
    MainComponent
  ]
})
export class MainModule { }
