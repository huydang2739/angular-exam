import { Routes, RouterModule } from '@angular/router';
import { CatImageComponent } from './cat-image/cat-image.component';
import { DogImageComponent } from './dog-image/dog-image.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'cat'
      },
      {
        path: 'cat',
        component: CatImageComponent
      },
      {
        path: 'dog',
        component: DogImageComponent
      }
    ]
  }
];

export const MainRoutes = RouterModule.forChild(routes);
