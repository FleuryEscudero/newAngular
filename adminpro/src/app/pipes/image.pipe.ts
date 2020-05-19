import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(image: string, table: string = 'user'): any {
    let url = URL_SERVICES + '/img';

    if (!image) {
      console.log('paso')
      return url + '/users/x';
    }

    if (image.indexOf('https') >= 0) {
    console.log('si es google paso por aqui')  
      return image;
    }

    switch (table) {
      case 'user':
        url += `/users/${image}`;
        break;
      case 'medician':
        url + `/medicians/${image}`;
        break;
      case 'hospital':
        url + `/hospitals/${image}`;
        break;
      default:
        console.log('Tipo de imagen no existe, usuarios, medicos, hospitales');
        url + '/users/x';
    }
    return url;
  }
}
