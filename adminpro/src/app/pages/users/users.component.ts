import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';
import swal from 'sweetalert';
import { ModalUploadService } from '../../shared/modal-upload/modal-upload.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  from: number = 0;
  totalRegistered: number = 0;
  loading: boolean = true;

  constructor(
    public _userService: UserService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this._modalUploadService.notification.subscribe((res) => this.loadUsers());
  }
  loadUsers() {
    this.loading = true;
    this._userService.loadUsers(this.from).subscribe((res: any) => {
      this.totalRegistered = res.total;
      this.users = res.users;
      this.loading = false;
    });
  }
  changeFrom(value: number) {
    let from = this.from + value;
    if (from >= this.totalRegistered) {
      return;
    }

    if (from < 0) {
      return;
    }

    this.from += value;
    this.loadUsers();
  }
  searchUser(data: string) {
    if (data.length <= 0) {
      this.loadUsers();
    }
    this.loading = true;
    this._userService.searchUsers(data).subscribe((users: User[]) => {
      this.users = users;
      this.loading = false;
    });
  }
  deleteUser(user) {
    if (user._id === this._userService.user._id) {
      swal(
        'No se puede borrar el usuario',
        'No se puede borrar a si mismo',
        'error'
      );
      return;
    }
    swal({
      title: '¿Estas Seguro?',
      text: `Se va a borrar al usuario ${user.name}`,
      icon: 'warning',
      buttons: ['No', true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this._userService.deleteUser(user._id).subscribe((res) => {
          if (this.totalRegistered > this.from) {
            let from = -5;
            this.changeFrom(from);
          }
        });
      }
    });
  }
  updateUser(user: User) {
    this._userService.updateUser(user).subscribe((res) => {
      console.log(res);
      swal(
        'Usuario actualizado',
        `El usuario ${user.name} ha sido actualizado exitosamente`,
        'success'
      );
    });
  }
  callModal(id: string) {
    this._modalUploadService.showModal('users', id);
  }
}
