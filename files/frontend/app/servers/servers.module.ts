import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {DataTableModule, SharedModule} from 'primeng/primeng';

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
    SlimLoadingBarModule.forRoot(),
    DataTableModule,
  ],
  declarations: [
    ServersComponent,
    ServerDetailComponent,
    ServerEditComponent
  ],
  providers: [
    ServersService,
  ],
})
export class ServersModule { }
