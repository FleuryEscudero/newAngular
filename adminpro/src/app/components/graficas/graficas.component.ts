import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styles: [],
})
export class GraficasComponent implements OnInit {
  @Input() Leyenda;
  @Input() doughnutChartLabels: Label[] = [];
  @Input() doughnutChartData: MultiDataSet[] = [];
  @Input() doughnutChartType: ChartType = 'doughnut';
 

  constructor() {}

  ngOnInit(): void {}
}
