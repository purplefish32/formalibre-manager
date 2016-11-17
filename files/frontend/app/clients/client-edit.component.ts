import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router }            from '@angular/router';
import { ClientsService } from './clients.service';
import { Client } from './client'
import { ClientProfile } from './clientProfile'
import { PopoverModule } from "ng2-popover"

@Component({
  selector: 'ClientEdit',
  templateUrl: 'templates/client-edit.component.html'
})

export class ClientEditComponent implements OnInit {
  client: Client = new Client();

  constructor(
    private clients: ClientsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id)
        this.clients.getClient(id).subscribe(clientProfile => this.client = new Client(clientProfile));
    });
  }

  onSubmit() {
    if (this.client.id) {
      this.clients.update(this.client).subscribe(
        response => {
          this.router.navigate(['client', this.client.id])
        }
      )
    } else {
      this.clients.create(this.client).subscribe(
        response => {
          this.router.navigate(['client', response.id])
        }
      );
    }
  }

  onDelete() {
    if (this.client.id != '') {
      this.clients.delete(this.client.id).subscribe(client => this.router.navigate(['clients']), () => this.router.navigate(['clients']));
    }
  }

  // TODO: Remove this when we're done
  get_diagnostic() {
    return JSON.stringify(this.client);
  }

}
