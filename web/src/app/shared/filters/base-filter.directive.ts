import { EventEmitter, Output, Input, OnInit, OnDestroy, Directive } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

export enum FilterType {
  TextFilter = 'TextFilter',
  DropDownFilter = 'DropDownFilter',
  DatePickerFilter = 'DatePickerFilter',
  DateSpanFilter = 'DateSpanFilter',
  ButtonFilter = 'ButtonFilter',
  ToggleSwitchFilter = 'ToggleSwitchFilter',
  CheckboxFilter = 'CheckboxFilter',
  SearchFilter = 'SearchFilter'
}

export interface FilterResult {
  type: FilterType;
  name?: string;
  value: any;
  filterColumns: string[];
  filterFn?: () => any;
}

/*
  Input values:
  - initValue = Initialize value
  - columns = Which columns (array of strings) in table this component should filter (optional - default all)
  - name = The name of the component that should be returned in the result (optional)
  - useReloadEvent = if the changed value should trigger reload event instead of value changed event
  - filterRn = A function that will be passed to the filtering and used instead of default
  - debounceTime = Value in ms to wait before value changed event is triggerered

  Output event:
  - valueChange
  - reload
*/
@Directive()
export abstract class BaseFilterDirective implements OnInit, OnDestroy {
  abstract type: FilterType;

  value: any;

  @Input() initValue: any;
  @Input() columns: any[];
  @Input() name: string;
  // @Input() useReloadEvent = false;
  @Input() filterFn: () => any;
  @Input() debounceTime = 0;

  @Output() valueChange = new EventEmitter<FilterResult>(true);
  @Output() reload = new EventEmitter<FilterResult>(true);

  delayedValueChangeEmit$ = new Subject();
  valueChangedSubscription: Subscription;

  ngOnInit(): void {
    if (this.debounceTime > 0) {
      this.valueChangedSubscription = this.delayedValueChangeEmit$
        .pipe(debounceTime(this.debounceTime))
        .subscribe((value: FilterResult) => this.valueChange.emit(value));
    }
  }

  ngOnDestroy(): void {
    if (this.valueChangedSubscription) {
      this.valueChangedSubscription.unsubscribe();
      this.valueChangedSubscription = undefined;
    }
  }

  getFilterValue(): FilterResult {
    const result: FilterResult = {
      name: this.name,
      type: this.type,
      value: this.value,
      filterColumns: this.columns,
      filterFn: this.filterFn,
    };

    return result;
  }

  setValue(val: any): void {
    this.value = val;
  }

  onValueChange($event, fireEvent = true, useDelayedEvent = true): void {
    this.value = $event;

    if (!fireEvent) {
      return;
    }

    if (useDelayedEvent && this.debounceTime > 0) {
      this.delayedValueChangeEmit$.next(this.getFilterValue());
    } else {
      this.valueChange.emit(this.getFilterValue());
    }
  }
}
