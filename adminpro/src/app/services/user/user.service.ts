import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICES } from 'src/app/config/config';

import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UploadService } from '../upload/upload.service';

import swal from 'sweetalert';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadService: UploadService
  ) {
    this.LoadToken();
  }
  createUser(user: User) {
    const url = URL_SERVICES + '/User';
    return this.http.post(url, user).pipe(
      map((res: any) => {
        swal('Usuario Creado!', user.email, 'success');
        return res.user;
      })
    );
  }

  LoadToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  hasLogin() {
    return this.token.length > 5 ? true : false;
  }

  saveLocalStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  googleLogin(token: string) {
    const url = URL_SERVICES + '/login/google';
    return this.http.post(url, { token }).pipe(
      map((res: any) => {
        this.saveLocalStorage(res.id, res.token, res.user);
        return true;
      })
    );
  }

  login(user: User, rememberMe: boolean = false) {
    if (rememberMe) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICES + '/login';
    return this.http.post(url, user).pipe(
      map((res: any) => {
        this.saveLocalStorage(res.id, res.token, res.user);
        return true;
      })
    );
  }

  logOut() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  updateUser(user: User) {
    const url = URL_SERVICES + `/user/${this.user['_id']}?token=${this.token}`;

    return this.http.put(url, user).pipe(
      map((res: any) => {
        const id = res._id;
        this.saveLocalStorage(id, this.token, res.user);
        swal('Usuario Actualizado!', user.email, 'success');
        return true;
      })
    );
  }
  imageChange(file: File, id: string) {
    this._uploadService
      .uploadFile(file, 'users', id)
      .then((res: any) => {
        // console.log(res)
        this.user.image = res.user.image;
        console.log(this.user.image);
        this.saveLocalStorage(id, this.token, res.user);
        swal('Imagen de Usuario Actualizado!', this.user.name, 'success');
      })
      .catch((res) => {
        console.log(res);
      });
  }
}
