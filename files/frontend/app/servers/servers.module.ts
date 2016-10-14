import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
//
// import {
//   LocationStrategy,
//   HashLocationStrategy
// } from '@angular/common';
//
// import { AppComponent }  from './app.component';
// import { routing } from './app.routing'
//
// import { DashboardComponent }      from './dashboard/dashboard.component';
import { ServerRouting }      from './servers.routing';
import { ServersService }      from './servers.service';
import { ServersComponent }      from './servers.component';
import { ServerDetailComponent } from './server-detail.component';
import { ServerEditComponent } from './server-edit.component';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ServerRouting,
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [
    ServersComponent,
    ServerDetailComponent,
    ServerEditComponent
  ],
  providers: [
    //    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ServersService,
  ],
  //bootstrap: [ AppComponent ]
})
export class ServersModule { }
