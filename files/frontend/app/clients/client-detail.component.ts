import { Component, Input } from '@angular/core';
import { Client } from './client';

@Component({
  selector: '[ClientDetail]',
  templateUrl: 'templates/client-detail.component.html'
})
export class ClientDetailComponent {
  @Input() client: Client;
}
