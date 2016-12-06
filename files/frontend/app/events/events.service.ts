import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ServiceTools } from '../tools/servicetools/servicetools.service'
import { Event } from './event';

type LocalType = Event

@Injectable()
export class EventsService {
  public context = {
    apiRoute: "events", // Route to web event api
    name: "Event"
  }

  constructor(private servicetools: ServiceTools) {
    servicetools.setRoute(this.context)
  }

  all(): Observable<LocalType[]> {
    return this.servicetools.all(this.context)
  }

  get(id: string): Observable<LocalType> {
    return this.servicetools.get(this.context,id)
  }

  delete(id: string): Observable<Response> {
    return this.servicetools.delete(this.context,id)
  }

  create(event: LocalType): Observable<LocalType[]> {
    return this.servicetools.create(this.context,event)
  }

  update(event: LocalType): Observable<Response> {
    return this.servicetools.update(this.context,event)
  }

}
