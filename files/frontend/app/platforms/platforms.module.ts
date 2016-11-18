import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { PlatformsRouting }      from './platforms.routing';
import { PlatformsService }      from './platforms.service';
import { PlatformsComponent }      from './platforms.component';
import { PlatformDetailComponent } from './platform-detail.component';
import { PlatformEditComponent } from './platform-edit.component';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {DataTableModule, SharedModule} from 'primeng/primeng';
import { PopoverModule } from "ng2-popover"
import { MarkdownModule } from '../tools/markdown/markdown.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    PlatformsRouting,
    DataTableModule,
    PopoverModule,
    MarkdownModule,
    SlimLoadingBarModule.forRoot(),
  ],
  declarations: [
    PlatformsComponent,
    PlatformDetailComponent,
    PlatformEditComponent,
  ],
  providers: [
    PlatformsService,
  ],
})
export class PlatformsModule { }
