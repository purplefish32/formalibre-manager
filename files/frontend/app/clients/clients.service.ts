import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import { Client } from './client';
import { ClientProfile } from './clientProfile';
import {SlimLoadingBarComponent, SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { EventsService } from '../events/events.service';
import { Event } from '../events/event';

function clone(obj) {
  if (obj == null || typeof (obj) != 'object')
    return obj;

  var temp = new obj.constructor();
  for (var key in obj)
    temp[key] = clone(obj[key]);

  return temp;
}

declare var base_url: string

@Injectable()
export class ClientsService {

  clients = [];

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private clientsUrl = base_url + '/clients';  // URL to web clients api

  constructor(
    private http: Http,
    private progressLoader: SlimLoadingBarService,
    private events: EventsService) {
  }

  onModify(id, text: string): Observable<Event[]> {
    let event = new Event(id, text)
    return this.events.create(event)
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  onRequestStart() {
    this.progressLoader.start();
  }

  onRequestEnd(obs) {
    var published = obs.share();
    published.subscribe(() => this.progressLoader.complete())
    return published
  }


  cache: Client[] = []

  get(url: string): Observable<any> {
    this.onRequestStart()
    return this.onRequestEnd(
      this.http.get(url)
        .map(response => response.json())
    )
  }

  getClients(): Observable<ClientProfile[]> {
    return Observable.merge(
      Observable.of(this.cache),
      this.get(this.clientsUrl).map(response => this.cache = response));
  }

  getClient(id: string): Observable<ClientProfile> {
    return this.get(`${this.clientsUrl}/${id}`)
  }

  getClientProfile(id: string): Observable<ClientProfile> {
    return this.get(`${this.clientsUrl}/${id}/history`)
  }

  delete(id: string): Observable<Response> {
    let url = `${this.clientsUrl}/${id}`;
    this.onRequestStart()
    return this.onRequestEnd(
      this.http.delete(url, { headers: this.headers })
    )
  }

  create(client: Client): Observable<Client[]> {
    this.onRequestStart()
    return this.onRequestEnd(
      this.http
        .post(this.clientsUrl, JSON.stringify(client), { headers: this.headers })
        .flatMap(response => {
          let result: Client = response.json()
          return this.onModify(result.id, "Client created.")
            .map(data => result)
        })
    )
  }

  update(client: Client): Observable<Response> {
    const url = `${this.clientsUrl}/${client.id}`;
    let dataToSend = clone(client)
    delete dataToSend.id
    this.onRequestStart()
    return this.onRequestEnd(
      this.http
        .put(url, JSON.stringify(dataToSend), { headers: this.headers })
        .flatMap(response => {
          return this.onModify(client.id, "Client data updated.")
        })
    )
  }

}
