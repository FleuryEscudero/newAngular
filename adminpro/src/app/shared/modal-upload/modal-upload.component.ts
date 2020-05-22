import { Component, OnInit } from '@angular/core';

import { UploadService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

import { User } from 'src/app/models/user.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [],
})
export class ModalUploadComponent implements OnInit {
  user: User;
  uploadFile: File;
  tempImage: string | ArrayBuffer;

  constructor(
    public _uploadService: UploadService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.tempImage = null;
    this.uploadFile = null;
    this._modalUploadService.hideModal();
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

    reader.onloadend = () => (this.tempImage = reader.result);
  }

  imageChange(file: File) {
    this._uploadService
      .uploadFile(
        this.uploadFile,
        this._modalUploadService.table,
        this._modalUploadService.id
      )
      .then((res) => {
        this._modalUploadService.notification.emit(res);
        this.closeModal();
        swal('Usuario Actualizado', 'Laimagen del usuario fue actualizado correctamente', 'success')
      })
      .catch((err) => {
        console.log('Error en la carga!');
      });
  }
}
