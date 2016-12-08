import { Component, OnInit } from '@angular/core';
import { ClientDetailComponent } from './client-detail.component'
import { ClientProfile } from './clientProfile'
import { ClientsService } from './clients.service'
import {DataTableModule, SharedModule} from 'primeng/primeng';

@Component({
  selector: 'clients',
  templateUrl: 'templates/clients.component.html',
  providers: [ClientDetailComponent, DataTableModule]
})
export class ClientsComponent implements OnInit {
  clients: ClientProfile[];

  ngOnInit(): void {
    this.getClients();
  }

  constructor(
    private clientsService: ClientsService
  ) { }

  getClients(): void {
    console.log('fetching clients');
    this.clientsService.all().subscribe(
      clients => {
        this.clients = clients;
        console.dir(this.clients);
      }
    );
  }
}
