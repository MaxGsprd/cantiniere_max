import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import  jwtDecode , {JwtPayload } from 'jwt-decode';


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

  isLunchlady :boolean = false;

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    let formatedData = this.loginFormData;
    this._auth.login(formatedData)
      .subscribe(
        (response) => {

          // token reception
          const token: string = response.headers.get('Authorization');
          console.log(token);

          // token decoding 
          let decodedToken :any = jwtDecode<JwtPayload>(token);
          console.log(decodedToken);

          // storing token
          localStorage.setItem('token', token);

          // check if isLunchlady 
          this.isLunchlady = decodedToken.user.isLunchLady ? true : false;
          
        },
        error => {
          console.log(error);
        }
      )
  }

}
