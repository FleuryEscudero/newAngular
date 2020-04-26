import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/service.index';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent , data: { title: 'Progreso'} },
      { path: 'graphics1', component: Graphics1Component , data: { title: 'Graficas'} },
      { path: 'accountSettings', component: AccountSettingsComponent , data: { title: 'Configuracion de la cuenta'} },
      { path: 'promises', component: PromisesComponent , data: { title: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent , data: { title: 'RXJS'} },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
