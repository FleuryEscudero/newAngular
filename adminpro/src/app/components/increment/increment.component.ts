import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [],
})
export class IncrementComponent implements OnInit {
  @ViewChild('text') text: ElementRef;
  @Input('nombre') legend: string = 'Leyenda';
  @Input() porcentaje: number = 50;
  @Output() porcentajechange: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onChanges(nValue: number) {
    if (nValue >= 100) {
      this.porcentaje = 100;
    } else if (nValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = nValue;
    }
    this.text.nativeElement.value = this.porcentaje;
    this.porcentajechange.emit(this.porcentaje);
  }

  changeValue(changeValue: number) {
    if (this.porcentaje >= 100 && changeValue > 0) {
      this.porcentaje = 100;
      console.log('ya llegaste al maximo');
      return;
    }
    if (this.porcentaje <= 0 && changeValue < 0) {
      this.porcentaje = 0;
      console.log('ya llegaste al minimo');
      return;
    }
    this.porcentaje = this.porcentaje + changeValue;
    this.porcentajechange.emit(this.porcentaje);
    this.text.nativeElement.focus();
  }
}
