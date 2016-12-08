import { NgModule }      from '@angular/core';
import { ServiceTools } from "./servicetools.service"
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { MessagesModule } from '../messages/messages.module'
@NgModule({
  imports: [
    SlimLoadingBarModule,
    MessagesModule,
  ],
  declarations: [],
  exports: [],
  providers: [
    ServiceTools,
  ],
})
export class ServiceToolsModule { }
