import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/share';
import { Event } from './event';
import {SlimLoadingBarComponent, SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Injectable()
export class EventsService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private eventsUrl = base_url + '/events';  // URL to web events api

  constructor(private http: Http, private progressLoader: SlimLoadingBarService) {
    this.getEvents()
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

  getEvents(): Observable<Event[]> {
    this.onRequestStart()
    return this.onRequestEnd(
      this.http.get(this.eventsUrl)
        .map(response => response.json())
    )
  }

  getEvent(id: string): Observable<Event> {
    var promise = this.getEvents().toPromise()
      .then(events => events.find(event => event.id === id))
      .catch(this.handleError);
    return Observable.fromPromise(promise);
  }

  delete(id: string): Observable<Response> {
    let url = `${this.eventsUrl}/${id}`;
    this.onRequestStart()
    return this.onRequestEnd(
      this.http.delete(url, { headers: this.headers })
    )
  }

  create(event: Event): Observable<Event[]> {
    this.onRequestStart()
    return this.onRequestEnd(
      this.http
        .post(this.eventsUrl, JSON.stringify(event), { headers: this.headers })
        .map(response => response.json())
    )
  }

  update(event: Event): Observable<Response> {
    const url = `${this.eventsUrl}/${event.id}`;
    let dataToSend = event
    delete dataToSend.id
    this.onRequestStart()
    return this.onRequestEnd(
      this.http
        .put(url, JSON.stringify(dataToSend), { headers: this.headers })
    )
  }

}
