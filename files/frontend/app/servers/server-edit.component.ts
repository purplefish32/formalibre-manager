import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router }            from '@angular/router';
import { ServersService } from './servers.service';
import { Server } from './server'
import { PopoverModule } from "ng2-popover"

@Component({
  selector: 'ServerEdit',
  templateUrl: 'templates/server-edit.component.html'
})

export class ServerEditComponent implements OnInit {
  server: Server = new Server();

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
      if (id)
        this.servers.get(id).subscribe(server => this.server = server);
    });
  }

  onSubmit() {
    if (this.server.id) {
      this.servers.update(this.server).subscribe(server => this.router.navigate(['servers']), () => this.router.navigate(['servers']));
    } else {
      this.servers.create(this.server).subscribe(server => this.router.navigate(['servers']), () => this.router.navigate(['servers']));
    }
  }

  onDelete() {
    if (this.server.id != '') {
      this.servers.delete(this.server.id).subscribe(server => this.router.navigate(['servers']), () => this.router.navigate(['servers']));
    }
  }

  // TODO: Remove this when we're done
  get_diagnostic() {
    return JSON.stringify(this.server);
  }

}
