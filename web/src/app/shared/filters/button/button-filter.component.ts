import {
  Component,
  OnInit,
  forwardRef,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { BaseFilterDirective, FilterType } from '../base-filter.directive';

@Component({
  selector: 'app-filter-button',
  template: `
    <main class="md:mr-2 px-1 ng-star-inserted">
      <section class="relative">
        <button type="button" class="bl-button bl-button-primary my-0" (click)="btnClick()">
          <ng-content></ng-content>
        </button>
      </section>
    </main>
  `,
  styles: [
    `
      .filter-button-float-above {
        top: -63px;
        right: 0;
        margin-right: -0.5rem;
        position: absolute;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: BaseFilterDirective, useExisting: forwardRef(() => ButtonFilterComponent) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFilterComponent extends BaseFilterDirective {
  type = FilterType.ButtonFilter;

  @HostBinding('class.filter-button-float-above')
  @Input()
  floatAbove = false;

  constructor() {
    super();
  }

  btnClick() {
    this.onValueChange(null);
  }
}
