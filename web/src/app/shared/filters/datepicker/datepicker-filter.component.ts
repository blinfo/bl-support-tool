import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { BaseFilterDirective, FilterResult, FilterType } from '../base-filter.directive';

@Component({
  selector: 'app-filter-datepicker',
  template: `
    <main class="md:w-48 md:max-w-xs md:mr-2 px-1 my-1 ng-star-inserted">
      <section class="relative">
        <input
          type="date"
          max="2999-12-31"
          class="bl-input pr-1  rounded-lg"
          [ngModel]="value"
          (ngModelChange)="onValueChange($event)"
          name="picker"
        />
        <div class="bl-label-arrow">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </section>
    </main>
  `,
  providers: [{ provide: BaseFilterDirective, useExisting: forwardRef(() => DatePickerFilterComponent) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/*
  Input values:
  - initValue = Initialize date value
  - columns = Which columns (array of strings) in table this component should filter (optional - default all)
  - name = The name of the component that should be returned in the result (optional)

  Output event:
  - valueChange
*/
export class DatePickerFilterComponent extends BaseFilterDirective implements AfterViewInit, OnInit {
  type = FilterType.DatePickerFilter;

  @Input() initValue: any;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    if (this.initValue) {
      this.value = this.initValue;
    }
  }

  ngAfterViewInit(): void {
    this.onValueChange(this.value, false, false);
  }
}
