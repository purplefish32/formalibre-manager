import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { ClientsComponent }     from './clients.component';
import { ClientEditComponent }  from './client-edit.component';
import { ClientViewComponent }  from './client-view.component';

export const ClientRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'client/new',
    component: ClientEditComponent
  },
  {
    path: 'client/edit/:id',
    component: ClientEditComponent
  },
  {
    path: 'client/:id',
    component: ClientViewComponent
  },

]);
