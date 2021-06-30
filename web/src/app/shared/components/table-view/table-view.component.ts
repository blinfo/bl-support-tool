import { Component, Input, ContentChildren, QueryList } from '@angular/core';
import { TableColumnDirective } from '../../directives/table-column.directive';

@Component({
  selector: 'app-bl-table-view',
  template: `<ng-content></ng-content>`,
})
export class TableViewComponent {
  @ContentChildren(TableColumnDirective) rowColumnDirectives: QueryList<TableColumnDirective>;

  @Input() desktop: any;
  @Input() mobile: any;

  get isMobileView(): boolean {
    return this.mobile !== undefined;
  }

  get isDesktopView(): boolean {
    return this.desktop !== undefined;
  }

  tableColumns(): QueryList<TableColumnDirective> {
    return this.rowColumnDirectives;
  }
}
