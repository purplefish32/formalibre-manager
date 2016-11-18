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
import { PopoverModule } from "ng2-popover"
import { MarkdownModule } from '../tools/markdown/markdown.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ServerRouting,
    PopoverModule,
    SlimLoadingBarModule.forRoot(),
    DataTableModule,
    MarkdownModule,
  ],
  declarations: [
    ServersComponent,
    ServerDetailComponent,
    ServerEditComponent,
  ],
  providers: [
    ServersService,
  ],
})
export class ServersModule { }
