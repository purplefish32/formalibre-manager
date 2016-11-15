import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

import { AppComponent }  from './app.component';
import { routing } from './app.routing'

import { DashboardComponent }      from './dashboard/dashboard.component';
import { ServersModule }      from './servers/servers.module';
import { PlatformsModule }      from './platforms/platforms.module';
import { ClientsModule }      from './clients/clients.module';
import { EventsModule }      from './events/events.module';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ServersModule,
    PlatformsModule,
    ClientsModule,
    EventsModule,
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
