 import { NgModule }      from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { RouterModule } from '@angular/router';
 import { FormsModule }   from '@angular/forms';
 import { HttpModule }    from '@angular/http';
 import {DataTableModule,SharedModule} from 'primeng/primeng';
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
 import { ClientRouting }      from './clients.routing';
 import { ClientsService }      from './clients.service';
 import { ClientsComponent }      from './clients.component';
 import { ClientDetailComponent } from './client-detail.component';
 import { ClientEditComponent } from './client-edit.component';
 import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ClientRouting,
    DataTableModule,
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [
    ClientsComponent,
    ClientDetailComponent,
    ClientEditComponent
  ],
  providers: [
//    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ClientsService,
  ],
  //bootstrap: [ AppComponent ]
})
export class ClientsModule { }
