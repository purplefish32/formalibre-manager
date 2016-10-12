import { Component, Input } from '@angular/core';
import { Platform } from './platform';

@Component({
  selector: '[PlatformDetail]',
  template: `
      <!--$ platforms/model@removeIdx.forEach(extract,field).forEach(prefix,platform/).list(<td>{{#}}</td>)-->
      <td>{{platform.name}}</td>
      <td>{{platform.subdomain}}</td>
      <td>{{platform.description}}</td>
      <td>{{platform.plan}}</td>
      <td>{{platform.end_date}}</td>
      <td>{{platform.max_users}}</td>
      <td>{{platform.max_disk_space}}</td>
      <td>{{platform.contact_name}}</td>
      <td>{{platform.contact_email}}</td>
      <td>{{platform.contact_phone}}</td>
      <!--$ -->
      <td>
        <a routerLink="/platform/edit/{{platform.id}}" *ngIf="platform.hasOwnProperty('id')" class="btn btn-default btn-xs"><i class="fa fa-edit"></i></a>
        <img src="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif" height="22px" width="24px" *ngIf="!platform.hasOwnProperty('id')">
     </td>
  `
})
export class PlatformDetailComponent {
  @Input() platform: Platform;
}
