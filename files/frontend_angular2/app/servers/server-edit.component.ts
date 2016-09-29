import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router }            from '@angular/router';
import { ServersService } from './servers.service';
import { Server } from './server'

@Component({
  selector: 'ServerEdit',
  templateUrl: 'templates/server-edit.component.html'
 })

export class ServerEditComponent implements OnInit {
  server:Server = new Server();

  constructor(
    private servers: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.server = new Server();
    console.dir(this.server);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if(id)
        this.servers.getServer(id).then(server => this.server = server);
    });
  }

  onSubmit() {
    if(this.server.id) {
      this.servers.update(this.server);
    } else {
      this.servers.create(this.server);
    }

    this.router.navigate(['servers']);
  }

  // TODO: Remove this when we're done
  get_diagnostic() {
    return JSON.stringify(this.server);
  }

}
