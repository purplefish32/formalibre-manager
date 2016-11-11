import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { EventsComponent }     from './events.component';
import { EventEditComponent }  from './event-edit.component';

export const EventRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'event/edit/:id',
    component: EventEditComponent
  },
  {
    path: 'event/new',
    component: EventEditComponent
  }
]);
