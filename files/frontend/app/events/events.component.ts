import { Component, OnInit } from '@angular/core';
import { EventDetailComponent } from './event-detail.component'
import { Event } from './event'
import { EventsService } from './events.service'
import 'rxjs/add/operator/toPromise';
import {DataTableModule,SharedModule} from 'primeng/primeng';

@Component({
  selector: 'events',
  templateUrl: 'templates/events.component.html',
  providers: [EventDetailComponent, EventsService, DataTableModule, SharedModule]
})
export class EventsComponent implements OnInit {
  events: Event[];

  ngOnInit(): void {
    this.getEvents();
  }

  date(d) {
    return moment(d).calendar()
  }

  constructor(
    private eventsService: EventsService
  ) { }

  getEvents(): void {
    console.log('fetching events');
    this.eventsService.getEvents().toPromise().then(
      events => {
        this.events = events;
        console.dir(this.events);
      }
    );
  }
}
