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
import { MarkdownModule}           from './tools/markdown/markdown.module'
import { ServiceToolsModule } from './tools/services/servicetools.module'
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import { MessagesModule}           from './tools/messages/messages.module'

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
    MarkdownModule,
    ServiceToolsModule,
    SlimLoadingBarModule.forRoot(),
    MessagesModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  exports: [
    MarkdownModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MarkdownModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
