import { Component, forwardRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { BaseFilterDirective, FilterType } from '../base-filter.directive';

@Component({
  selector: 'app-filter-text',
  template: `
    <main class="ng-star-inserted pb-3">
      <section class="relative">
        <input
          type="search"
          class="bl-input pl-12 w-full rounded-lg"
          [placeholder]="displayText ? displayText : 'Sök'"
          [ngModel]="value"
          (ngModelChange)="onValueChange($event)"
        />
        <div class="bl-search-icon px-4">
          <i class="fal fa-search text-xl text-bl-blue-300"></i>
        </div>
      </section>
    </main>
  `,
  styles: [
    `
      input[type='search']::-webkit-search-cancel-button {
        -webkit-appearance: searchfield-cancel-button;
      }
    `,
  ],
  providers: [{ provide: BaseFilterDirective, useExisting: forwardRef(() => TextFilterComponent) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/*
  Input values:
  - initValue = Initialized text value
  - columns = Which column (array of strings) in table this component should filter (optional - default all)
  - name = The name of the component that should be returned in the result (optional)

  Output event:
  - valueChange
*/
export class TextFilterComponent extends BaseFilterDirective {
  @Input() displayText: string;
  type = FilterType.TextFilter;

  constructor() {
    super();
  }

  setValue(val: any): void {
    this.value = val;
  }
}
