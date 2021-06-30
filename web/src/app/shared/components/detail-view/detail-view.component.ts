import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailViewContent } from '../../interfaces/detail-view-content';
import { DropdownItem } from '@shared/models/dropdown-item';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent<K, V> implements OnInit {
  @Input() detailData$: Observable<DetailViewContent>;
  @Input() dropdownItems: DropdownItem[];
  @Input() selectedDropdownItem: DropdownItem;
  @Output() eventHandler: EventEmitter<DropdownItem> = new EventEmitter<DropdownItem>();

  constructor() { }

  ngOnInit(): void {
  }

  onDropdownClick(event: DropdownItem): void {
    this.eventHandler.emit(event);
  }

}
