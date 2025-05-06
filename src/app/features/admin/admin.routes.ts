import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'category',
        loadComponent: () => import('./features/category/category.component'),
      },
    ],
  },
];
