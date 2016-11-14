import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { DataTableModule, SharedModule } from 'primeng/primeng';

import { ClientRouting }      from './clients.routing';
import { ClientsService }      from './clients.service';
/*$ clients @ import_modules */
import { ClientsComponent } from './clients.component'
import { ClientDetailComponent } from './client-detail.component'
import { ClientEditComponent } from './client-edit.component'
import { ClientViewComponent } from './client-view.component'
/*$  */
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

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
    /*$ clients @ list_modules */
    ClientsComponent,
    ClientDetailComponent,
    ClientEditComponent,
    ClientViewComponent,
    /*$  */
  ],
  providers: [
    ClientsService,
  ],
})
export class ClientsModule { }
