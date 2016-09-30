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


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ServersModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
