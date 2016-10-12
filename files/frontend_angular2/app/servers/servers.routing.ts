import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { ServersComponent }     from './servers.component';
import { ServerEditComponent }  from './server-edit.component';

export const ServerRouting: ModuleWithProviders = RouterModule.forChild([
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
]);
