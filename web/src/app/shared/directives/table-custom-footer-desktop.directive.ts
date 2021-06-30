import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[desktop]',
})
export class TableCustomFooterDesktopDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
