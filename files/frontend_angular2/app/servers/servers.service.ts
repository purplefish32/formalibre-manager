import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Server } from './server';

@Injectable()
export class ServersService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private serversUrl = 'http://api.manager.loc/servers';  // URL to web api

  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getServers(): Promise<Server[]> {
    return this.http.get(this.serversUrl)
               .toPromise()
               .then(response => response.json() as Server[])
               .catch(this.handleError);
  }
}
