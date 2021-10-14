import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private route: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('token') != null) {
      const clonedReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
      return next.handle(clonedReq).pipe(
        tap(
          success => { },
          error => {
            if (error.status == 401) { localStorage.removeItem('token'); this.route.navigateByUrl('/user/login') }
            else if (error.status == 403) { this.route.navigateByUrl('/forbidden') }
          }       ))
    } else {
      return next.handle(request.clone());
    }
  }
}
