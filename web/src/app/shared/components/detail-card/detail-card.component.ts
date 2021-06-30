import { Component, Input, OnInit } from '@angular/core';
import { DetailCard } from '@shared/models/detail-card';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
})
export class DetailCardComponent implements OnInit {
  @Input() card: DetailCard<any>;
  @Input() editable: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
