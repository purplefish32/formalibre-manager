import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServersComponent }     from './servers/servers.component';
import { ServerEditComponent }  from './servers/server-edit.component';
import { DashboardComponent }   from './dashboard/dashboard.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'servers',
    component: ServersComponent
  },
  {
    path: 'server/edit/:id',
    component: ServerEditComponent
  },
  {
    path: 'server/new',
    component: ServerEditComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
