import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/share';
import { Server } from './server';
import {SlimLoadingBarComponent, SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Injectable()
export class ServersService {

  servers = [];

  private headers = new Headers({'Content-Type': 'application/json'});
  private serversUrl = base_url+'/servers';  // URL to web servers api

  constructor(private http: Http, private progressLoader: SlimLoadingBarService) {
    this.getServers()
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

  getServers(): Observable<Server[]> {
    this.onRequestStart()
    return this.onRequestEnd(
      this.http.get(this.serversUrl)
        .map(response => response.json())
    )
  }

  getServer(id:string): Observable<Server> {
    var promise = this.getServers().toPromise()
               .then(servers => servers.find(server => server.id === id))
               .catch(this.handleError);
    return Observable.fromPromise(promise);
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
