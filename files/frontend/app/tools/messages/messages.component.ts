import { Component, Input } from '@angular/core';
import { MessagesService } from './messages.service';

@Component({
  selector: 'messages',
  template: `<p-growl [value]="messagesService.msgs" life="3000">`
})
export class MessagesComponent {
  constructor(private messagesService: MessagesService) { }
}
