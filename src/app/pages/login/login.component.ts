import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormData = {
    "email":null,
    "password":null
  };


  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    let formatedData = this.loginFormData;
    this._auth.login(formatedData)
      .subscribe(
        (response) => {
          console.log(response.headers.get('Authorization'))
          let token = response.headers.get('Authorization')
          localStorage.setItem('token', token)
        },
        error => {
          console.log(error);
        }
      )
  }

}
