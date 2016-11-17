import { Injectable } from '@angular/core';
import { Headers, Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import { Event } from './event';
import {SlimLoadingBarComponent, SlimLoadingBarService} from 'ng2-slim-loading-bar';

declare var base_url: string

@Injectable()
export class EventsService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private eventsUrl = base_url + '/events';  // URL to web events api

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

  cache: Event[] = []

  get(url: string): Observable<any> {
    this.onRequestStart()
    return this.onRequestEnd(
      this.http.get(url)
        .map(response => response.json())
    )
  }

  getEvents(): Observable<Event[]> {
    return Observable.merge(
      Observable.of(this.cache),
      this.get(this.eventsUrl).map(response => this.cache = response));
  }

  getEvent(id: string): Observable<Event> {
    console.log('requesting events ' + id)
    return this.get(this.eventsUrl + `/` + id)
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
