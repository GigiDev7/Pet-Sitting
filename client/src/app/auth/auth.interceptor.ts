import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpClient,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BASE_URL } from '../config/config';
import { delayWhen, skipUntil, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private jwtHelper: JwtHelperService, private http: HttpClient) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${user.accessToken}`),
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
