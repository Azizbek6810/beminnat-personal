import { Routes } from '@angular/router';
import { ClientComponent } from './features/client/client.component';
import { AdminComponent } from './features/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((r) => r.routes),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
];
