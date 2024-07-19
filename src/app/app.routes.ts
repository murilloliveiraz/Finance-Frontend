import { AuthGuardService } from './pages/guard/auth-guard.service';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
    canActivate: [AuthGuardService]
  },
  {
    path: 'sistema',
    loadChildren: () => import('./pages/sistema/sistema.routes').then(m => m.SISTEMA_ROUTES),
  },
  {
    path: 'categoria',
    loadChildren: () => import('./pages/categoria/categoria.routes').then(m => m.CATEGORIA_ROUTES),
  },
  {
    path: 'transacoes',
    loadChildren: () => import('./pages/transacoes/transacoes.routes').then(m => m.TRANSACOES_ROUTES),
  },
];
