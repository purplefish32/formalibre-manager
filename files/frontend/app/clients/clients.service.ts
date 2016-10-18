import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/share';
import { Client } from './client';
import {SlimLoadingBarComponent, SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Injectable()
export class ClientsService {

  clients = [];

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private clientsUrl = base_url + '/clients';  // URL to web clients api

  constructor(private http: Http, private progressLoader: SlimLoadingBarService) {
    this.getClients()
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

  getClients(): Observable<Client[]> {
    this.onRequestStart()
    return this.onRequestEnd(
      this.http.get(this.clientsUrl)
        .map(response => response.json())
    )
  }

  getClient(id: string): Observable<Client> {
    var promise = this.getClients().toPromise()
      .then(clients => clients.find(client => client.id === id))
      .catch(this.handleError);
    return Observable.fromPromise(promise);
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
        .map(response => response.json())
    )
  }

  update(client: Client): Observable<Response> {
    const url = `${this.clientsUrl}/${client.id}`;
    let dataToSend = client
    delete dataToSend.id
    this.onRequestStart()
    return this.onRequestEnd(
      this.http
        .put(url, JSON.stringify(dataToSend), { headers: this.headers })
    )
  }

}
