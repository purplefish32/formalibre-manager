import { Injectable } from '@angular/core';
import { Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ServiceTools } from '../tools/servicetools/servicetools.service'
import { Platform, PlatformSerial } from './platform';

type LocalType = Platform
class SerializedType extends PlatformSerial {}

@Injectable()
export class PlatformsService {
  public context = {
    apiRoute: "platforms" , // Route to web platform api
    name: "Platform"
  }

  constructor(private servicetools: ServiceTools) {
    servicetools.setRoute(this.context)
  }

  serialize(data: LocalType): SerializedType {
    return SerializedType.fromPlatform(data)
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
    return this.servicetools.create(this.context, this.serialize(platform))
  }

  update(platform: LocalType): Observable<Response> {
    return this.servicetools.update(this.context, this.serialize(platform))
  }
}
