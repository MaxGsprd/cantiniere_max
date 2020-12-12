import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    let tok: any = this._auth.getToken();
    if (tok) {
      let decodedTok = this._auth.decodeToken(tok);
      let isLunchLady = decodedTok.user.isLunchLady;
      if (isLunchLady) {
        return true
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
