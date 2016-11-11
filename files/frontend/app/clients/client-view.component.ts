import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router }            from '@angular/router';
import { ClientsService } from './clients.service';
import { ClientProfile } from './clientProfile'
import { Event } from '../events/event'
import { EventsService } from '../events/events.service'
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment'

@Component({
  selector: 'ClientView',
  templateUrl: 'templates/client-view.component.html'
})

export class ClientViewComponent implements OnInit {
  client: ClientProfile = new ClientProfile();
  note: string = ""

  constructor(
    private clients: ClientsService,
    private events: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  date(d) {
    try {
      return moment(d).calendar()
    } catch(e) {
      console.dir(e)
      return ""
    }
  }

  currentDate() {
    try {
      return (new Date()).toString().split(' ').splice(1, 3).join(' ')
    } catch(e) {
      console.dir(e)
      return ""
    }
  }

  loadClientDetail(id) {
    this.clients.getClientProfile(id).toPromise().then(client => this.client = client);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id)
        this.loadClientDetail(id)
    });
  }

  onDelete() {
    if (this.client.id != '') {
      this.clients.delete(this.client.id).toPromise().then(client => this.router.navigate(['clients']), () => this.router.navigate(['clients']));
    }
  }

  onSubmitNote() {
    let id = this.client.id
    let event = new Event(this.client.id, this.note)
    this.note = ""
    this.events.create(event).toPromise().then(response => this.loadClientDetail(id))
  }
}
