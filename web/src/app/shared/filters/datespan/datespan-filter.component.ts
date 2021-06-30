import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { BaseFilterDirective, FilterType } from '../base-filter.directive';

@Component({
  selector: 'app-filter-datespan',
  template: `
    <main *ngIf="!hidden" class="flex flex-row w-full ng-star-inserted">
      <app-filter-datepicker
        class="w-1/2 md:w-full"
        [columns]="columns"
        [initValue]="selectedSpan.value.start"
        [debounceTime]="debounceTime"
        (valueChange)="onStartChange($event)"
      ></app-filter-datepicker>
      <app-filter-datepicker
        class="w-1/2 md:w-full"
        [columns]="columns"
        [initValue]="selectedSpan.value.end"
        [debounceTime]="debounceTime"
        (valueChange)="onEndChange($event)"
      ></app-filter-datepicker>
    </main>
  `,
  providers: [{ provide: BaseFilterDirective, useExisting: forwardRef(() => DateSpanFilterComponent) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/*
  Input values:
  - initValue = Initialize value as object ({ start: '2019-01-01', end: '2019-05-01'}) or array (['2019-01-01', '2019-05-01'])
  - columns = Which columns (array of strings) in table this component should filter (optional - default all)
  - name = The name of the component that should be returned in the result (optional)

  Output event:
  - valueChange
*/
export class DateSpanFilterComponent extends BaseFilterDirective implements OnInit {
  type = FilterType.DateSpanFilter;
  selectedSpan: any;

  @Input() initValue: any;
  @Input() hidden: boolean;

  constructor() {
    super();
  }

  ngOnInit(): void {
    let start;
    let end;

    super.ngOnInit();

    if (Array.isArray(this.initValue)) {
      start = this.initValue[0];
      end = this.initValue[1];
    } else if (typeof this.initValue === 'object') {
      start = this.initValue.start;
      end = this.initValue.end;
    }

    this.selectedSpan = {
      name: this.name,
      type: this.type,
      value: { start, end },
      filterColumns: this.columns,
    };
  }

  setValue(val: any): void {
    this.selectedSpan.value = val;
  }

  onStartChange($event: any): void {
    this.selectedSpan.value.start = $event.value;
    this.onValueChange(this.selectedSpan.value, true, false);
  }

  onEndChange($event: any): void {
    this.selectedSpan.value.end = $event.value;
    this.onValueChange(this.selectedSpan.value, true, false);
  }
}
