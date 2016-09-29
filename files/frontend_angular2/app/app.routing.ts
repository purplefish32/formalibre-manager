import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ServersComponent }      from './servers.component';

import { DashboardComponent }      from './dashboard/dashboard.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }/*,
  {
    path: 'servers',
    component: ServersComponent
  },
  {
    path: 'server/edit/:id',
    component: DashboardComponent
  }*/
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
