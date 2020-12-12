import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _API_URL = "http://localhost:8080/lunchtime/";


  constructor(private http: HttpClient, private router: Router) { }

  login(loginFormData: any) :Observable<any>{
    return this.http.post<any>(this._API_URL + "login", loginFormData, {observe: "response"});
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
