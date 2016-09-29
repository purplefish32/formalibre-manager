import { Component, Input } from '@angular/core';
import { Server } from './server';

@Component({
  selector: '[ServerDetail]',
  template: `
      <td>{{server.name}}</td>
      <td>{{server.ip}}</td>
      <td>{{server.provider}}</td>
      <td>{{server.type}}</td>
      <td>{{server.description}}</td>
      <td>
        <a routerLink="/server/edit/{{server.id}}" *ngIf="server.hasOwnProperty('id')" class="btn btn-default btn-xs"><i class="fa fa-edit"></i></a>
        <img src="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif" height="22px" width="24px" *ngIf="!server.hasOwnProperty('id')">
     </td>
  `
})
export class ServerDetailComponent {
  @Input() server: Server;
}
