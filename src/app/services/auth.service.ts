import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  jwtDecode , {JwtPayload } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _API_URL = "http://localhost:8080/lunchtime/";

  constructor(private http: HttpClient) { }


  // send form data to lunchTime api
  login(loginFormData: any) :Observable<any>{
    return this.http.post<any>(this._API_URL + "login", loginFormData, {observe: "response"});
  }

  // decode jwt token 
  decodeToken(token: string) {
    let decodedToken :any = jwtDecode<JwtPayload>(token);
    // console.log(decodedToken);
    return decodedToken;
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
