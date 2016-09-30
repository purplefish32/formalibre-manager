import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'servers',
    redirectTo: 'servers',
    pathMatch: 'prefix'
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
