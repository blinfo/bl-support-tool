import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  group,
  animateChild,
  query,
} from '@angular/animations';
import { TableCustomFooterMobileDirective } from '../../directives/table-custom-footer-mobile.directive';
import { TableCustomFooterDesktopDirective } from '../../directives/table-custom-footer-desktop.directive';

const ANIMATION_TIME = '250ms';

@Component({
  selector: 'app-bl-table-custom-footer',
  template: `<ng-content></ng-content>`,
})
export class TableCustomFooterComponent {
  @Input() whiteBackgroundOnMobile = true;
  @Input() visible = true;

  @ContentChild(TemplateRef)
  allSizeTemplate: TemplateRef<any>;

  @ContentChild(TableCustomFooterMobileDirective)
  mobileSizeDirective: TableCustomFooterMobileDirective;

  @ContentChild(TableCustomFooterDesktopDirective)
  desktopSizeDirective: TableCustomFooterDesktopDirective;

  getTemplateRef(mobile?: boolean): TemplateRef<any> {
    if (mobile && this.mobileSizeDirective) {
      return this.mobileSizeDirective.templateRef;
    }
    return this.desktopSizeDirective ? this.desktopSizeDirective.templateRef : this.allSizeTemplate;
  }
}

// ------------------
// Används internt i bl-table men innehåller stylingen för footen
@Component({
  selector: 'app-bl-table-inner-custom-footer',
  template: `
    <ng-template #desktop>
      <ng-container>
        <div @showHideParent class="pb-5">
          <div @showHideChild class="w-full bg-white shadow-lg rounded-lg px-3 py-2">
            <ng-container *ngTemplateOutlet="content"></ng-container>
          </div>
        </div>
      </ng-container>
    </ng-template>

    <ng-template #mobile>
      <div
        @showHideParent
        class="absolute bottom-0 mb-2 w-full"
        [ngClass]="{ 'bg-white bg-white-gradient': whiteBackgroundOnMobile }"
      >
        <div class="h-auto" @showHideChild>
          <ng-container *ngTemplateOutlet="content"></ng-container>
        </div>
      </div>
    </ng-template>

    <ng-template #content><ng-content></ng-content></ng-template>

    <ng-container *ngTemplateOutlet="showMobileView ? mobile : desktop"></ng-container>
  `,
  animations: [
    trigger('showHideParent', [
      transition(':enter', [
        style({ opacity: 0 }),
        group([
          animate(ANIMATION_TIME, style({ opacity: 1 })),
          query('@showHideChild', animateChild()),
        ]),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        group([
          animate(ANIMATION_TIME, style({ opacity: 0 })),
          query('@showHideChild', animateChild()),
        ]),
      ]),
    ]),
    trigger('showHideChild', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        group([animate(ANIMATION_TIME, style({ transform: 'translateY(0%)' }))]),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0%)' }),
        group([animate(ANIMATION_TIME, style({ transform: 'translateY(100%)' }))]),
      ]),
    ]),
  ],
})
export class BlTableInnerCustomFooterComponent {
  @Input() showMobileView = false;
  @Input() whiteBackgroundOnMobile = true;
}
