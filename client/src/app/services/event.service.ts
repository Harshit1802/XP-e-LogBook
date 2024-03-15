import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Injectable()
export class EventsService {
  constructor() {}

  // returns EventInput[], but AFAIK the package doesn't export the type
  /** Return the events for the given span. */
  get(start: string, end: string): Observable<any[]> {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // below we create some random events but in a real application
    // one could use the HTTP service to query a backend service

    /* in ms */
    const span = endDate.valueOf() - startDate.valueOf();
    const nbEventsToCreate = randomInteger(1, 5);
    const events = [];
    const subSpan = span / nbEventsToCreate / randomInteger(1, 5);
    while (events.length < nbEventsToCreate) {
      events.push({
        title: `Event ${events.length + 1}`,
        start: new Date(startDate.valueOf() + subSpan * events.length),
        end: new Date(startDate.valueOf() + subSpan * (events.length + 1))
      });
    }
    return of(events);
  }
}