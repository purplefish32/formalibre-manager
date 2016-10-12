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


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    PlatformsRouting,
  ],
  declarations: [
    PlatformsComponent,
    PlatformDetailComponent,
    PlatformEditComponent
  ],
  providers: [
    PlatformsService,
  ],
})
export class PlatformsModule { }
