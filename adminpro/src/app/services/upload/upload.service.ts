import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor() {}

  uploadFile(file: File, table: string, id: string) {

    return new Promise((resolve, reject)=>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
  
      formData.append('image', file, file.name);
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
  
          if(xhr.status === 200){
            console.log('file uploaded',JSON.parse(xhr.response));
            resolve(JSON.parse(xhr.response));
          }else{
            console.log('Fallo la subida');
            reject(xhr.response);
          }
        }
      };

      let url = URL_SERVICES + `/upload/${table}/${id}`;

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }
}
