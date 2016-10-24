import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router }            from '@angular/router';
import { ClientsService } from './clients.service';
import { Client } from './client'
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'ClientEdit',
  templateUrl: 'templates/client-edit.component.html'
 })

export class ClientEditComponent implements OnInit {
  client:Client = new Client();

  constructor(
    private clients: ClientsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.client = new Client();
    console.dir(this.client);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if(id)
        this.clients.getClient(id).toPromise().then(client => this.client = client);
    });
  }

  onSubmit() {
    if(this.client.id) {
      this.clients.update(this.client).toPromise().then(client=>this.router.navigate(['clients']),()=>this.router.navigate(['clients']));
    } else {
      this.clients.create(this.client).toPromise().then(client=>this.router.navigate(['clients']),()=>this.router.navigate(['clients']));
    }
  }

  onDelete() {
    if(this.client.id != '') {
      this.clients.delete(this.client.id).toPromise().then(client=>this.router.navigate(['clients']),()=>this.router.navigate(['clients']));
    }
  }

  // TODO: Remove this when we're done
  get_diagnostic() {
    return JSON.stringify(this.client);
  }

}