import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

import { AppComponent }  from './app.component';
import { routing } from './app.routing'

import { DashboardComponent }      from './dashboard/dashboard.component';
import { ServersService }      from './servers/servers.service';
import { ServersComponent }      from './servers/servers.component';
import { ServerDetailComponent } from './servers/server-detail.component';
import { ServerEditComponent } from './servers/server-edit.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ServersComponent,
    ServerDetailComponent,
    ServerEditComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ServersService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
