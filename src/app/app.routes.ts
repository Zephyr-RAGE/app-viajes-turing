import { Routes } from '@angular/router';

import { Bienvenida } from './components/bienvenida/bienvenida';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Bienvenida,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'registro',
    component: Registro,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
