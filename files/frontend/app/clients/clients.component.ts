import { Component, OnInit } from '@angular/core';
import { ClientDetailComponent } from './client-detail.component'
import { Client } from './client'
import { ClientsService } from './clients.service'
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'clients',
  templateUrl: 'templates/clients.component.html',
  providers: [ClientDetailComponent, ClientsService]
})
export class ClientsComponent implements OnInit {
  clients:Client[];

  ngOnInit(): void {
    this.getClients();
  }

  constructor(
      private clientsService: ClientsService
    ) { }

  getClients(): void {
    console.log('fetching clients');
    this.clientsService.getClients().toPromise().then(
      clients => {
          this.clients = clients;
          console.dir(this.clients);
        }
      );
  }
}
