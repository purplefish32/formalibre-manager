import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import { Platform } from './platform';

@Injectable()
export class PlatformsService {

  platforms = [];

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private platformsUrl = base_url+'/platforms';  // URL to web platforms api

  constructor(private http: Http) {
    this.getPlatforms()
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  getPlatforms(): Observable<Platform[]> {
    return this.http.get(this.platformsUrl)
      .map(response => response.json());
  }

  getPlatform(id: string): Observable<Platform> {
    var promise = this.getPlatforms().toPromise()
      .then(platforms => platforms.find(platform => platform.id === id))
      .catch(this.handleError);
    return Observable.fromPromise(promise);
  }

  delete(id: string): Observable<Response> {
    let url = `${this.platformsUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers });
  }

  create(platform: Platform): Observable<Platform[]> {
    return this.http
      .post(this.platformsUrl, JSON.stringify(platform), { headers: this.headers })
      .map(response => response.json())
  }

  update(platform: Platform): Observable<Response> {
    const url = `${this.platformsUrl}/${platform.id}`;
    let dataToSend = platform
    delete dataToSend.id
    return this.http
      .put(url, JSON.stringify(dataToSend), { headers: this.headers });
  }

}
