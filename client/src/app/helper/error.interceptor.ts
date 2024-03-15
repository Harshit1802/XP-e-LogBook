import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { EventBusService } from '../services/event-bus.service';
import { NotificationService } from '../services/notification.service';



@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: LoginService,
        private notificationService: NotificationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.accountService.me()) {
                // auto logout if 401 or 403 response returned from api
                this.accountService.logout();
            }
            if (err) {
                // const error = err.error;
                // this.notificationService.errorSubject$.next('aaaaaaaa');

                // let errorMsg = '';
                // if (err.error instanceof ErrorEvent) {
                    
                //     errorMsg = `Error: ${err.error.message}`;
                // }
                // else {
                   
                //     errorMsg = err.error.msg;
                // }
                // console.log(errorMsg);
                //return throwError(errorMsg);
            }
            return throwError(() => err);
        }))
    }
}