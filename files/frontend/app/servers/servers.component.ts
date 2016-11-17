import { Component, OnInit } from '@angular/core';
import { ServerDetailComponent } from './server-detail.component'
import { Server } from './server'
import { ServersService } from './servers.service'
import {DataTableModule, SharedModule} from 'primeng/primeng';

@Component({
  selector: 'servers',
  templateUrl: 'templates/servers.component.html',
  providers: [ServerDetailComponent, DataTableModule, SharedModule]
})
export class ServersComponent implements OnInit {
  servers: Server[];

  ngOnInit(): void {
    this.getServers();
  }

  constructor(
    private serversService: ServersService
  ) { }

  getServers(): void {
    console.log('fetching servers');
    this.serversService.getServers().subscribe(
      servers => {
        this.servers = servers;
        console.dir(this.servers);
      },
      () => console.log('done')
    );
  }
}
