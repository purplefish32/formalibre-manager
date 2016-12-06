import { Injectable } from '@angular/core'
import { Headers, Http, Response} from '@angular/http'
import { SlimLoadingBarComponent, SlimLoadingBarService } from 'ng2-slim-loading-bar'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/merge'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share'
import { MessagesService } from '../messages/messages.service'

function clone(obj) {
  if (obj == null || typeof (obj) != 'object')
    return obj;

  var temp = new obj.constructor();
  for (var key in obj)
    temp[key] = clone(obj[key]);

  return temp;
}

declare var base_url: string

@Injectable()
export class ServiceTools {

  error: boolean = false

  constructor(private http: Http,
    private progressLoader: SlimLoadingBarService,
    private messagesService: MessagesService) {
    console.log('ServiceTools - constructor')
  }

  public headers = new Headers({ 'Content-Type': 'application/json' });

  setRoute(context) {
    console.log(`${context.apiRoute} service initialized...`);
    context.baseUrl = base_url + "/" + context.apiRoute
  }

  public checkResponseArray(response) {
    console.log('Response received')
    if (response) {
      this.error = false
      return response.json()
    } else {
      this.error = true
      return []
    }
  }

  public onRequestStart() {
    this.progressLoader.start();
  }

  public onRequestEnd(obs) {
    let shared = obs.share();
    shared.subscribe(() => this.progressLoader.complete())
    return shared
  }

  private errorHandling(context, operationCb) {
    this.onRequestStart()
    let obs = operationCb()
    let shared = obs.share()

    shared.subscribe(
      response => {
        if (context.successMsg)
          this.messagesService.add({ severity: 'success', summary: context.successMsg })
        return null
      },
      error => {
        let color = this.progressLoader.color
        this.progressLoader.color = "firebrick"
        this.progressLoader.complete()
        this.progressLoader.color = color
        this.messagesService.add({ severity: 'error', summary: 'Connexion error', detail: `The application wasn't able to communicate with the server.` })
        console.dir(error)
      })
    return shared
  }

  private arrayHandling(context, operationCb, transCb = null): Observable<any> {

    let req = this.errorHandling(context, operationCb)

    let obs
    if (transCb)
      obs = transCb(req)
    else
      obs = req.map(response => this.checkResponseArray(response))

    return this.onRequestEnd(obs)

  }

  private ignoreHandling(context, operationCb): Observable<any> {
    let req = this.errorHandling(context, operationCb)
    return this.onRequestEnd(req)
  }

  private cache: Object[] = []

  public all(context: any): Observable<any> {
    context.successMsg = 'all'
    if (!context.cache)
      context.cache = []
    return Observable.merge(
      Observable.of(context.cache),
      this.get(context))
  }

  public get(context: any, id: string = null, options: { urlAppend?} = {}): Observable<any> {
    context.successMsg = null
    let url: string = context.baseUrl

    if (id) {
      url += `/` + id
      console.log('requesting ${this.apiRoute} ' + id)
    }

    if (options.hasOwnProperty('urlAppend'))
      url = url + "/" + options.urlAppend
    return this.arrayHandling(context, () => this.http.get(url))
  }

  delete(context: any, id: string, options = {}): Observable<Response> {
    context.successMsg = context.name + ' removed.'
    let url: string = `${context.baseUrl}/${id}`
    return this.ignoreHandling(context, () => this.http.delete(url, { headers: this.headers }))
  }

  create(context: any, jsondata: any, options = {}, resultCb = null) {
    context.successMsg = context.name + ' created.'
    let reqCb = () => this.http.post(context.baseUrl, JSON.stringify(jsondata), { headers: this.headers })

    return this.arrayHandling(context, reqCb, resultCb)
  }

  update(context: any, jsondata: any, options = {}, resultCb = null): Observable<Response> {
    context.successMsg = context.name + ' updated.'
    let url: string = `${context.baseUrl}/${jsondata.id}`
    let dataToSend = clone(jsondata)
    delete dataToSend.id
    let reqCb = () => this.http.put(url, JSON.stringify(dataToSend), { headers: this.headers })
    return this.arrayHandling(context, reqCb, resultCb)
  }
}
