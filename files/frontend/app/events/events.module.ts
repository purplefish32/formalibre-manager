import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { EventRouting }      from './events.routing';
import { EventsService }      from './events.service';
/*$ events @ import_modules */
import { EventsComponent } from './events.component'
import { EventDetailComponent } from './event-detail.component'
import { EventEditComponent } from './event-edit.component'
/*$  */
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    EventRouting,
    SlimLoadingBarModule.forRoot(),
    DataTableModule,
  ],
  declarations: [
    EventsComponent,
    EventDetailComponent,
    EventEditComponent
  ],
  providers: [
    EventsService,
  ],
})
export class EventsModule { }
