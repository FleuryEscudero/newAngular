import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service.index';
import { User } from 'src/app/models/user.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  user: User;
  uploadFile: File;
  tempImage: string | ArrayBuffer ;
  constructor(public _userService: UserService) {}

  ngOnInit(): void {
    this.user = this._userService.user;
  }

  update(user: User) {
    if (!this.user.google) {
      this.user.email = user.email;
    }
    this._userService.updateUser(user).subscribe((res) => {});
  }

  imageSelected(file: File) {
    if (!file) {
      this.uploadFile = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      swal(
        'Solo se permiten archivos de tipo imagen',
        'El archivo selecionado no es una imagen',
        'error'
      );
      this.uploadFile = null;
      return;
    }

    this.uploadFile = file;

    let reader = new FileReader();
    let urlTempImage = reader.readAsDataURL(file);

    reader.onloadend = () => this.tempImage = reader.result ;
  }

  imageChange() {
    this._userService.imageChange(this.uploadFile, this.user._id);
  }
}
