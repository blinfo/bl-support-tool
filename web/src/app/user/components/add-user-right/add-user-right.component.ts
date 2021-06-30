import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { Property } from '../../../shared/models/property';
import { getPropertiesFilteredByUserRights } from '../../../shared/store/propety/property.selectors';
import { map } from 'rxjs/operators';
import { UserRightService } from '../../../core/services/user-right.service';
import { UserRight } from '../../../shared/models/user-right';
import { DropdownItem } from '../../../shared/models/dropdown-item';

@Component({
  selector: 'app-add-user-right',
  templateUrl: './add-user-right.component.html',
})
export class AddUserRightComponent implements OnInit {
  @Input() userRights: UserRight[];
  @Input() isAddNewMode = false;
  @Output() propertyEvent: EventEmitter<Property> = new EventEmitter();

  selectedValue;
  options: DropdownItem[];

  constructor(private store: Store<State>, private userRightService: UserRightService) {}

  ngOnInit(): void {
    this.store
      .select(getPropertiesFilteredByUserRights(this.userRights))
      .pipe(
        map(props =>
          props
            .filter(prop => this.userRightService.filterAdditionalUserRights(prop.key))
            .map(prop => this.toDropDownItem(prop)),
        ),
      ).subscribe(items => {
        this.options = [...items];
    });
  }

  addNewMode(): void {
    this.isAddNewMode = !this.isAddNewMode;
  }

  add(item: DropdownItem): void {
    this.isAddNewMode = false;
    this.propertyEvent.emit(item.value);
  }

  toDropDownItem(property: Property): DropdownItem {
    return new DropdownItem(property.key, property);
  }
}
