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
    this._auth.login(this.loginFormData)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
  }

}
