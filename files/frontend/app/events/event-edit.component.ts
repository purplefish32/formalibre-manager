import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router }            from '@angular/router';
import { EventsService } from './events.service';
import { Event } from './event'
import 'rxjs/add/operator/toPromise';
import { PopoverModule } from "ng2-popover"

@Component({
  selector: 'EventEdit',
  templateUrl: 'templates/event-edit.component.html'
})

export class EventEditComponent implements OnInit {
  event: Event = new Event();

  constructor(
    private events: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.event = new Event();
    console.dir(this.event);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id)
        this.events.getEvent(id).toPromise().then(event => this.event = event);
    });
  }

  onSubmit() {
    if (this.event.id) {
      this.events.update(this.event).toPromise().then(event => this.router.navigate(['events']), () => this.router.navigate(['events']));
    } else {
      this.events.create(this.event).toPromise().then(event => this.router.navigate(['events']), () => this.router.navigate(['events']));
    }
  }

  onDelete() {
    if (this.event.id != '') {
      this.events.delete(this.event.id).toPromise().then(event => this.router.navigate(['events']), () => this.router.navigate(['events']));
    }
  }

  // TODO: Remove this when we're done
  get_diagnostic() {
    return JSON.stringify(this.event);
  }

}
