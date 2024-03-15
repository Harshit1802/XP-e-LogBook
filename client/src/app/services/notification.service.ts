import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(){}
  

  public errorSubject$ = new Subject<string>();
  errorSubject = this.errorSubject$.asObservable();

  public setError(message: string): void {
    this.errorSubject$.next(message);
  }
  
}


