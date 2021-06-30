import {
  Component,
  Input,
  forwardRef,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BaseFilterDirective, FilterType } from '../base-filter.directive';

@Component({
  selector: 'app-filter-toggle-switch',
  template: `
    <main
      class="bg-white shadow-sm border border-bl-grey-200 rounded-full h-full cursor-pointer mb-3"
    >
      <section class="flex flex-row justify-around h-full cursor-pointer">
        <div
          *ngFor="let toggleSwitchData of values; let first = first"
          class="flex w-full cursor-pointer"
        >
          <div
            class="flex flex-col flex-1 font-medium text-bl-grey-900  px-3 py-2 rounded-full align-
        cursor-pointer border border-1 border-white text-center items-center"
            [ngClass]="toggleSwitchData.value === value ? 'toggle-switch-selected' : ''"
            (click)="onValueChange(toggleSwitchData)"
          >
            <label
              class="cursor-pointer text-base sm:text-sm leading-6 flex h-full justify-center items-center"
              for="{{ toggleSwitchData.displayName }}"
              >{{ toggleSwitchData.displayName }}</label
            >
            <input
              class="hidden"
              name="toggleSwitchData"
              id="{{ toggleSwitchData.displayName }}"
              type="radio"
              value="{{ toggleSwitchData }}"
              [attr.checked]="toggleSwitchData.value === value.value"
            />
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      .toggle-switch-selected {
        background-color: var(--bl-orange-100);
        border: 1px solid var(--bl-orange-500);
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }
    `,
  ],
  providers: [{ provide: BaseFilterDirective, useExisting: forwardRef(() => ToggleSwitchFilterComponent) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/*
    <main class="md:w-48 md:max-w-xs md:mr-2 px-1 my-1 ng-star-inserted">
      <section class="relative">
        <select
          class="bl-input rounded-lg"
          [ngModel]="value"
          (ngModelChange)="onValueChange($event)"
        >
          <option *ngFor="let option of values" [ngValue]="option">{{ option.displayName }}</option>
        </select>
        <div class="bl-label-arrow">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </section>
    </main>
  Input values:
  - initValue = Initialize value that should be selected (full "option"-object)
  - values = Array of options for the dropdown. Display property is "displayName"
  - valueKey = The property-key in selected option object that should be returend as value (default "value")
  - columns = Which column (array of strings) in table this component should filter (optional - default all)
  - name = The name of the component that should be returned in the result (optional)
  Output event:
  - valueChange
*/
export class ToggleSwitchFilterComponent extends BaseFilterDirective implements OnChanges {
  type = FilterType.ToggleSwitchFilter;

  @Input() values: any[];
  @Input() valueKey: any = 'value';
  @Input() initValue: any;
  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const values = 'values';
    if (changes && changes[values] && changes[values].currentValue) {
      if (this.value) {
        return this.onValueChange(this.values[0]);
      }
      this.setValue(this.value ? this.value.value : null);
    }
  }

  onValueChange($event, fireEvent = true): void {
    super.onValueChange($event[this.valueKey], fireEvent, false);
  }

  setValue(val: any): void {
    this.value = val;
  }
}
