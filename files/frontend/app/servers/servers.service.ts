import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Server } from './server';
import { ServiceTools } from '../tools/servicetools/servicetools.service'

type LocalType = Server

@Injectable()
export class ServersService {
  public context = {
    apiRoute: "servers", // Route to web server api
    name: "Server"
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

  create(platform: LocalType): Observable<LocalType[]> {
    return this.servicetools.create(this.context,platform)
  }

  update(platform: LocalType): Observable<Response> {
    return this.servicetools.update(this.context,platform)
  }

}
