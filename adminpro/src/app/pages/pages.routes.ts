import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      /* General */
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent , data: { title: 'Progreso'} },
      { path: 'graphics1', component: Graphics1Component , data: { title: 'Graficas'} },
      { path: 'accountSettings', component: AccountSettingsComponent , data: { title: 'Configuracion de la cuenta'} },
      { path: 'profile', component: ProfileComponent , data: { title: 'Perfil de Usuario'} },
      { path: 'promises', component: PromisesComponent , data: { title: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent , data: { title: 'RXJS'} },
      /* Mantenimientos */
      { path: 'users', component: UsersComponent , data: { title: 'Mantenimiento de Usuarios'} },
      /* 404 */
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
