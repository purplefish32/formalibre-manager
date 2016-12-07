import { NgModule }      from '@angular/core';
import { MessagesService } from "./messages.service"
import { MessagesComponent } from "./messages.component"
import { GrowlModule } from 'primeng/primeng';

@NgModule({
  imports: [
    GrowlModule
  ],
  declarations: [
    MessagesComponent,
  ],
  exports: [
    MessagesComponent,
  ],
  providers: [
    MessagesService,
  ],
})
export class MessagesModule { }
