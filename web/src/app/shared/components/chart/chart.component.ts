import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from '../../interfaces/chart-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() chartData$: Observable<ChartData>;
  @Input() colorScheme;

  constructor() {}

  ngOnInit(): void {
  }
}
