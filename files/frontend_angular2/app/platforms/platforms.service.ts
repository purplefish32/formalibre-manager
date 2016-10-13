import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/share';
import { Platform } from './platform';
import {SlimLoadingBarComponent, SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Injectable()
export class PlatformsService {

  platforms = [];

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private platformsUrl = base_url + '/platforms';  // URL to web platforms api

  constructor(private http: Http,private progressLoader: SlimLoadingBarService) {
    this.getPlatforms()
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

  getPlatforms(): Observable<Platform[]> {
    this.onRequestStart()
    return this.onRequestEnd(
      this.http.get(this.platformsUrl)
        .map(response => response.json())
    )
  }

  getPlatform(id: string): Observable<Platform> {
    var promise = this.getPlatforms().toPromise()
      .then(platforms => platforms.find(platform => platform.id === id))
      .catch(this.handleError);
    return Observable.fromPromise(promise);
  }

  delete(id: string): Observable<Response> {
    let url = `${this.platformsUrl}/${id}`;
    this.onRequestStart()
    return this.onRequestEnd(
      this.http.delete(url, { headers: this.headers })
    )
  }

  create(platform: Platform): Observable<Platform[]> {
    this.onRequestStart()
    return this.onRequestEnd(
      this.http
        .post(this.platformsUrl, JSON.stringify(platform), { headers: this.headers })
        .map(response => response.json())
    )
  }

  update(platform: Platform): Observable<Response> {
    const url = `${this.platformsUrl}/${platform.id}`;
    let dataToSend = platform
    delete dataToSend.id
    this.onRequestStart()
    return this.onRequestEnd(
      this.http
        .put(url, JSON.stringify(dataToSend), { headers: this.headers })
    )
  }

}
