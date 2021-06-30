import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { DropdownItem } from '../../models/dropdown-item';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { BaseFilterDirective, FilterType } from '../index';
import { IDropdownItem } from '../../interfaces/dropdown-item';

@Component({
  selector: 'app-search',
  templateUrl: './search-filter.component.html',
  providers: [{ provide: BaseFilterDirective, useExisting: forwardRef(() => SearchFilterComponent) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent extends BaseFilterDirective implements OnInit {
  @Input() items: DropdownItem[];
  @Input() selected: DropdownItem;
  @Input() validator: ValidatorFn;
  type = FilterType.SearchFilter;
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.searchForm = this.createFormGroup(this.formBuilder);
  }

  createFormGroup(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      text: '',
      requestType: ''
    });
  }

  onSubmit(): void {
    this.onValueChange(Object.assign({}, this.searchForm.value));
  }

  setRequestType(item: IDropdownItem): void {
    this.searchForm.patchValue({ requestType: item.value});
  }
}
