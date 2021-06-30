import {
  Component,
  Input,
  forwardRef,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BaseFilterDirective, FilterType } from '../base-filter.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-dropdown',
  template: `
    <main class="md:w-48 md:max-w-xs md:mr-2 my-1 ng-star-inserted">
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
  `,
  providers: [{ provide: BaseFilterDirective, useExisting: forwardRef(() => DropDownFilterComponent) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/*
  Input values:
  - initValue = Initialize value that should be selected (full "option"-object)
  - values = Array of options for the dropdown. Display property is "displayName"
  - valueKey = The property-key in selected option object that should be returend as value (default "value")
  - columns = Which column (array of strings) in table this component should filter (optional - default all)
  - name = The name of the component that should be returned in the result (optional)

  Output event:
  - valueChange
*/
export class DropDownFilterComponent extends BaseFilterDirective implements OnChanges {
  type = FilterType.DropDownFilter;

  @Input() values: any[];
  @Input() valueKey: any = 'value';
  @Input() initObservableValue: Observable<any>;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const values = 'values';
    if (changes && changes[values] && changes[values].currentValue) {
      if (this.value && !this.hasValueInList(this.value.value)) {
        return this.onValueChange(this.values[0]);
      }

      this.setValue(this.value ? this.value.value : null);
    }
  }

  onValueChange($event, fireEvent = true): void {
    super.onValueChange($event[this.valueKey], fireEvent, false);
    this.value = $event;
  }

  setValue(val: any): void {
    const valueComparer = this.createValueComparerFunction(val);
    this.value = this.values.find(valueComparer) || this.values[0];
  }

  private hasValueInList(val: any): boolean {
    const valueComparer = this.createValueComparerFunction(val);

    return this.values.some(valueComparer);
  }

  private createValueComparerFunction(val: any): (arrayItem: any) => boolean {
    return (arrayItem: any) => arrayItem[this.valueKey] === val;
  }
}
