import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import swal from 'sweetalert';

import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  // tslint:disable-next-line: variable-name
  constructor(public _userService: UserService, public router: Router) {}

  equalFields(field1: string, field2: string) {
    return (group: FormGroup) => {
      const p1 = group.controls[field1].value;
      const p2 = group.controls[field2].value;

      if (p1 === p2) {
        return null;
      }
      return {
        equals: true,
      };
    };
  }

  ngOnInit(): void {
    init_plugins();
    this.registerForm = new FormGroup(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        conditions: new FormControl(false),
      },
      { validators: this.equalFields('password', 'password2') }
    );

    this.registerForm.setValue({
      name: 'Fleury',
      email: 'fleury@gmail.com',
      password: '123456',
      password2: '123456',
      conditions: true,
    });
  }

  userRegister() {
    if (!this.registerForm.valid) {
      return;
    }

    if (!this.registerForm.value.conditions) {
      swal('Importante', 'Debe aceptar los Terminos y Condiciones!', 'error');
      return;
    }

    let user = new User(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password
    );

    this._userService.createUser(user).subscribe((res) => {
      this.router.navigate(['/login']);
    });
  }
}
