import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SettingsService {
  ajustes: Ajustes = {
    urlTheme: 'assets/css/colors/default-dark.css',
    theme: 'default-dark.css',
  };
  constructor(
    // tslint:disable-next-line: variable-name
    @Inject(DOCUMENT) private _document
  ) {
    this.getAjustes();
  }

  saveAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }
  getAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.themeApply(this.ajustes.theme);
    } else {
      this.themeApply(this.ajustes.theme);
    }
  }
  themeApply(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.ajustes.theme = theme;
    this.ajustes.urlTheme = url;
    this.saveAjustes();
  }
}

interface Ajustes {
  urlTheme: string;
  theme: string;
}
