import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [],
})
export class AccountSettingsComponent implements OnInit {
  constructor(
    // tslint:disable-next-line: variable-name
    public _ajustes: SettingsService
  ) {}

  ngOnInit(): void {
    this.workingClassCheck();
  }

  colorChange(color: string, link: any) {
    this._ajustes.themeApply(color);
    this.checkConfirm(link);
  }

  checkConfirm(link: any) {
    const selectors: any = document.getElementsByClassName('selector');
    // tslint:disable-next-line: prefer-const
    for (let ref of selectors) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  workingClassCheck() {
    const selectors: any = document.getElementsByClassName('selector');
    const themeLoaded = this._ajustes.ajustes.theme;
    // tslint:disable-next-line: prefer-const
    for (let ref of selectors) {
      if (ref.getAttribute('data-theme') === themeLoaded) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
