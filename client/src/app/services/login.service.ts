import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router, UrlSerializer } from '@angular/router';
import { LoginInfo, User } from '../models/user';
import { Result } from './result';
import { Constant } from '../models/Constant';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient,
    private readonly router: Router) {

    this.currentUserSubject = new BehaviorSubject<User>({} as User);
    this.currentUser = this.currentUserSubject.asObservable();

  }



  login(loginUser: LoginInfo): Observable<User> {
    return this.http.post<Result<User>>(Constant.apiUrl + 'api/auth/login', loginUser)
      .pipe(map((res: Result<User>) => {
        if (res.status && res.status.code == 200) {
          const data = res.data ?? {} as User;
          const token = res.data?.accessToken ?? '';
          localStorage.setItem('currentUser', JSON.stringify(data));
          localStorage.setItem('accessToken', token);
          this.currentUserSubject.next(data);
          return data;
        }
        return {} as User;
      }));
  }
  refreshToken(): Observable<string> {
    return new BehaviorSubject<string>('');
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken')
    this.router.navigate(['/auth/login'])
  }


  me() {
    if (localStorage.getItem('currentUser')) {
      const user: User = JSON.parse(localStorage.getItem('currentUser') ?? '');
      return user;
    }
    return null ; // localStorage.getItem('currentUser'); //this.currentUserSubject.getValue();
  }
  accessToken() {
    return localStorage.getItem('accessToken');
  }

}
