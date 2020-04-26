import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  rememberMe: boolean = false;
  auth2: any;

  // tslint:disable-next-line: variable-name
  constructor(public router: Router, public _userService: UserService) {}

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.rememberMe = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '187102497240-cor4cdgi69snoqs75crjdek4a75mij3m.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      // console.log(profile);
      const token = googleUser.getAuthResponse().id_token;
      this._userService.googleLogin(token).subscribe(() => {
        window.location.href = '#/dashboard';
      });
    });
  }

  signin(signForm: NgForm) {
    if (signForm.invalid) {
      return;
    }
    const user = new User(null, signForm.value.email, signForm.value.password);
    this._userService
      .login(user, signForm.value.rememberMe)
      .subscribe((res) => this.router.navigate(['/dashboard']));
  }
}
