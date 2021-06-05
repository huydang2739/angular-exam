import { Routes, RouterModule } from '@angular/router';
import { AnimalsImageComponent } from './animals-image/animals-image.component';
import { MainComponent } from './main.component';
import { FoodsImageComponent } from './foods-image/foods-image.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'foods'
      },
      {
        path: 'foods',
        component: FoodsImageComponent
      },
      {
        path: 'animals',
        component: AnimalsImageComponent
      }
    ]
  }
];

export const MainRoutes = RouterModule.forChild(routes);
