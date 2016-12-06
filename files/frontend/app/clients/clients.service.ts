import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap'
import { Client } from './client';
import { ClientProfile } from './clientProfile';
import { EventsService } from '../events/events.service';
import { Event } from '../events/event';
import { ServiceTools } from '../tools/servicetools/servicetools.service'

@Injectable()
export class ClientsService {
  public context = {
    apiRoute: "clients", // Route to web events api
    name: "Client"
  }

  constructor(
    private events: EventsService,
    private servicetools: ServiceTools) {
    servicetools.setRoute(this.context)
  }

  onModify(id, text: string): Observable<Event[]> {
    let event = new Event(id, text)
    return this.events.create(event)
  }

  all(): Observable<ClientProfile[]> {
    return this.servicetools.all(this.context)
  }

  getClient(id: string): Observable<ClientProfile> {
    return this.servicetools.get(this.context,id)
  }

  getClientProfile(id: string): Observable<ClientProfile> {
    return this.servicetools.get(this.context,id, { urlAppend: "history" })
  }

  delete(id: string): Observable<Response> {
    return this.servicetools.delete(this.context,id)
  }

  create(client: Client): Observable<Client[]> {
    let onResult = (obs) =>
      obs.mergeMap(response => {
        let result: Client = response.json()
        return this.onModify(result.id, "Client created.")
          .map(data => result)
      })

    return this.servicetools.create(
      this.context,
      client,
      {},
      onResult
    )
  }

  update(client: Client): Observable<Response> {
    let onResult = (obs) =>
      obs.mergeMap(response => this.onModify(client.id, "Client created."))
    return this.servicetools.update(this.context,client, {}, onResult)
  }

}
