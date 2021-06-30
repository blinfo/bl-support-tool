import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'ng-template[columnHeader]',
})
export class TableColumnDirective {
  @Input() columnHeader: string;
  @Input() columnHeaderClass: string;
  @Input() columnSortKey: string;
  @Input() filterItem: string;
  @Input() item: string;
  @Input() flexWidth: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
