import { Component, OnInit } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: [],
})
export class ProgressComponent implements OnInit {
  porcentaje1: number = 20;
  porcentaje2: number = 30;

  constructor() {}

  ngOnInit(): void {}

 
}
