import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import { Server } from './server';
import {SlimLoadingBarComponent, SlimLoadingBarService} from 'ng2-slim-loading-bar';

declare var base_url: string

@Injectable()
export class ServersService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serversUrl = base_url + '/servers';  // URL to web servers api

  constructor(private http: Http, private progressLoader: SlimLoadingBarService) {
      console.log('Server service initialized...');
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

  get(url: string): Observable<any> {
    this.onRequestStart()
    return this.onRequestEnd(
      this.http.get(url)
        .map(response => response.json())
    )
  }

  cache: Server[] = []

  getServers(): Observable<Server[]> {
    console.log('requesting servers')
    return Observable.merge(
      Observable.of(this.cache),
      this.get(this.serversUrl).map(response => this.cache = response));
  }

  getServer(id: string): Observable<Server> {
    console.log('requesting server ' + id)
    return this.get(this.serversUrl + `/` + id)
  }

  delete(id: string): Observable<Response> {
    let url = `${this.serversUrl}/${id}`;
    this.onRequestStart()
    return this.onRequestEnd(
      this.http.delete(url, { headers: this.headers })
    )
  }

  create(server: Server): Observable<Server[]> {
    this.onRequestStart()
    return this.onRequestEnd(
      this.http
        .post(this.serversUrl, JSON.stringify(server), { headers: this.headers })
        .map(response => response.json())
    )
  }

  update(server: Server): Observable<Response> {
    const url = `${this.serversUrl}/${server.id}`;
    let dataToSend = server
    delete dataToSend.id
    this.onRequestStart()
    return this.onRequestEnd(
      this.http
        .put(url, JSON.stringify(dataToSend), { headers: this.headers })
    )
  }

}
