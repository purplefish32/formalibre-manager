import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { PlatformsComponent }     from './platforms.component';
import { PlatformEditComponent }  from './platform-edit.component';

export const PlatformsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'platforms',
    component: PlatformsComponent
  },
  {
    path: 'platform/edit/:id',
    component: PlatformEditComponent
  },
  {
    path: 'platform/new',
    component: PlatformEditComponent
  }
]);
