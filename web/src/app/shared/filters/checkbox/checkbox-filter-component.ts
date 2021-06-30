import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BaseFilterDirective, FilterType } from '../base-filter.directive';
import { ToggleSwitchFilterComponent } from '../toggle-switch/toggle-switch-filter.component';

@Component({
  selector: 'app-checkbox-filter',
  template: ` <main
    class="cursor-pointer mb-3"
  >
    <section class="flex flex-row justify-start h-full cursor-pointer">
      <label class="flex items-center">
        <input type="checkbox" class="form-checkbox text-bl-orange-500 h-4 w-4" (change)='onValueChange($event.target)'>
        <span class="text-bl-grey-900 font-medium ml-4">{{ label }}</span>
      </label>
    </section>
  </main>`,
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
  providers: [
    { provide: BaseFilterDirective, useExisting: forwardRef(() => CheckboxFilterComponent) },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxFilterComponent extends BaseFilterDirective implements OnChanges {
  type = FilterType.CheckboxFilter;

  @Input() label: string;
  // @Input() checked: any = 'value';
  @Input() initValue = false;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes && changes.values && changes.values.currentValue) {
    //   if (this.value) {
    //     return this.onValueChange(this.values[0]);
    //   }
    //   this.setValue(this.value ? this.value.value : null);
    // }
  }

  onValueChange($event, fireEvent = true): void {
    super.onValueChange($event.checked, fireEvent, false);
  }

  setValue(val: any): void {
    this.value = val.checked;
  }
}
