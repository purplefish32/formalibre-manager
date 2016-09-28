import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Server } from './server';

@Injectable()
export class ServersService {

  servers = [];

  private headers = new Headers({'Content-Type': 'application/json'});
  private serversUrl = 'http://api.manager.loc/servers';  // URL to web servers api

  constructor(private http: Http) {
    this.getServers()
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  getServers(): Promise<Server[]> {
    return this.http.get(this.serversUrl)
               .toPromise()
               .then(response => response.json() as Server[])
               .catch(this.handleError);
  }

  getServer(id:string): Promise<Server> {
    return this.getServers()
               .then(servers => servers.find(server => server.id === id))
               .catch(this.handleError);
  }

  update(server: Server): Promise<Server> {
    const url = `${this.serversUrl}/${server.id}`;
    return this.http
      .put(url, JSON.stringify(server), {headers: this.headers})
      .toPromise()
      .then(() => server)
      .catch(this.handleError);
  }

}
