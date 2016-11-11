import { Component, Input } from '@angular/core';
import { Event } from './event';

@Component({
  selector: '[EventDetail]',
  template: `
      <td>{{event.name}}</td>
      <td>{{event.ip}}</td>
      <td>{{event.provider}}</td>
      <td>{{event.type}}</td>
      <td>{{event.description}}</td>
      <td>
        <a routerLink="/event/edit/{{event.id}}" *ngIf="event.hasOwnProperty('id')" class="btn btn-default btn-xs"><i class="fa fa-edit"></i></a>
        <img src="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif" height="22px" width="24px" *ngIf="!event.hasOwnProperty('id')">
     </td>
  `
})
export class EventDetailComponent {
  @Input() event: Event;
}
