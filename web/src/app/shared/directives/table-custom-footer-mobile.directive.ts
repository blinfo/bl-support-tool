import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[mobile]',
})
export class TableCustomFooterMobileDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
