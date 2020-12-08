import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private _auth: AuthService) { }

  intercept(req: any, next: any) {
    let reqWithToken = req.clone({
      setHeaders : {
        Authorization: `${this._auth.getToken()}`
      }
    })
    return next.handle(reqWithToken);
  }
}
