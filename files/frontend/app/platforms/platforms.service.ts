import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import { Platform } from './platform';
import {SlimLoadingBarComponent, SlimLoadingBarService} from 'ng2-slim-loading-bar';

declare var base_url: string

@Injectable()
export class PlatformsService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private platformsUrl = base_url + '/platforms';  // URL to web platforms api

  constructor(private http: Http, private progressLoader: SlimLoadingBarService) {
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

  cache: Platform[] = []

  getPlatforms(): Observable<Platform[]> {
    return Observable.merge(
      Observable.of(this.cache),
      this.get(this.platformsUrl).map(response => this.cache = response));
  }

  getPlatform(id: string): Observable<Platform> {
    console.log('requesting platform ' + id)
    return this.get(this.platformsUrl + `/` + id)
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
