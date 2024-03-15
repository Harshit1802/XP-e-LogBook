import { Injectable } from '@angular/core';
import { Subject, Observable, filter, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private eventSubject$ = new BehaviorSubject<any>('');
  eventChanged$ = this.eventSubject$.asObservable();

  setEvent(event:any){
    this.eventSubject$.next(event);
  }
  private eventBus: Subject<any> = new Subject<any>();

  publish(event: any): void {
   
    this.eventBus.next(event);
  }

  subscribe(eventName: string): Observable<any> {
    return this.eventBus.asObservable().pipe(
      filter((event: any) => event.name === eventName)
    );
  }
}