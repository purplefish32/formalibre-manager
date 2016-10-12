import { Component, Input } from '@angular/core';
import { Server } from './server';

@Component({
  selector: '[ServerDetail]',
  templateUrl: 'templates/server-detail.component.html'
})
export class ServerDetailComponent {
  @Input() server: Server;
}
