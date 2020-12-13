import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  isLunchLady :boolean = false;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    let formatedData = this.loginFormData;
    this._auth.login(formatedData)
      .subscribe(
        (response) => {

          // token reception
          const token: string = response.headers.get('Authorization');
          // console.log(token);

          // token decoding 
          let decodedToken = this._auth.decodeToken(token)

          // storing token
          localStorage.setItem('token', token);

          // check if isLunchlady 
          this.isLunchLady = decodedToken.user.isLunchLady ? true : false;
          if (this.isLunchLady) {
            this.router.navigate(['/admin']);
          }
          
        },
        error => {
          console.log(error);
        }
      )
  }

}
