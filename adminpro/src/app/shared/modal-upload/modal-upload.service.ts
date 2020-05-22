import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalUploadService {
  public table: string;
  public id: string;

  public hidden: string = 'hidden';

  public notification = new EventEmitter<any>();

  constructor() {}

  hideModal() {
    this.hidden = 'hidden';
    this.id = null;
    this.table = null;
  }
  showModal(table: string, id: string) {
    this.hidden = '';
    this.id = id;
    this.table = table;
  }
}
