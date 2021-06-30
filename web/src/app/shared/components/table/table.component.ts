import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
  HostListener,
  TemplateRef,
  ContentChild
} from '@angular/core';
import { trigger, transition, query, animateChild } from '@angular/animations';
import { Observable, Subscription, Subject, combineLatest } from 'rxjs';
import {
  map,
  distinctUntilKeyChanged,
  take,
  startWith,
  tap,
  withLatestFrom,
  filter,
} from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import {
  getCurrentPageNumber,
  getFilters,
  getPageInfo,
  getSort,
  getActiveRow,
} from '../../store/table/table.selectors';
import { BaseFilterDirective, FilterResult, FilterType } from '../../filters';
import { TableViewComponent } from '../table-view/table-view.component';
import { TableCustomFooterComponent } from '../table-custom-footer/table-custom-footer.component';
import { PageInfo } from '../../models/page-info';
import { TableState } from '../../store/table/table.state';
import { TablePageService } from '@core/services/table-page.service';
import { TableMessageService } from '@core/services/table-message.service';
import { clearActiveRow, loadFilters } from '../../store/table/table.actions';
import { DropDownFilterComponent } from '../../filters/dropdown/dropdown-filter.component';

export const enum TableSelectionType {
  single = SelectionType.single,
  checkbox = SelectionType.checkbox,
}

const cleanSortKey = (sortKey: string): string => {
  return sortKey.slice(5);
};

const distinctUntilChangedIfOtherThanButton = (component: BaseFilterDirective) => (
  source: Observable<any>,
) => {
  if (component.type === FilterType.ButtonFilter) {
    return source;
  }
  return source.pipe(distinctUntilKeyChanged('value'));
};

@Component({
  selector: 'app-bl-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('ngIfAnimation', [transition(':enter, :leave', [query('@*', animateChild())])]),
  ],
})
export class TableComponent implements OnInit, OnDestroy, AfterContentInit {
  @ContentChildren(TableViewComponent) tableViews: QueryList<TableViewComponent>;
  @ContentChildren(BaseFilterDirective, { descendants: true }) filterComponents: QueryList<BaseFilterDirective>;
  @ContentChild(TableCustomFooterComponent)
  customFooterComponent: TableCustomFooterComponent;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  customFooterTemplateRef: TemplateRef<any>;
  displayedColumns: {
    header: string;
    columnWidth: number;
    headerClass: string;
    sortKey: string;
    templateRef: TemplateRef<any>;
  }[] = [];

  subscriptions: Subscription[] = [];
  tableMessage = { emptyMessage: '' };
  screenWidth = window.innerWidth;
  distinctPageChangeSubject = new Subject<number>();
  pageInfo$: Observable<PageInfo>;
  pageSize = 20;
  currentPageData: any[];
  pageNumber = 1;
  columnMode = ColumnMode;

  @Input() hidePaginator: boolean;
  @Input() mobileRowHeight = 60;
  @Input() selectionType: TableSelectionType = TableSelectionType.single;
  @Input() selected: any[] = [];

  // tslint:disable-next-line:variable-name
  private _dataSource: any[] = [];
  @Input() set dataSource(value: any[]) {
    this._dataSource = value;
  }

  get dataSource(): any[] {
    return this._dataSource;
  }

  @Output() rowClick = new EventEmitter<any>();
  @Output() selectChange = new EventEmitter<any>();

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.screenWidth = window.innerWidth;
    this.initTable();
    this.table.recalculate();
  }

  constructor(
    private store: Store<TableState>,
    private pageService: TablePageService,
    private messageService: TableMessageService,
  ) {}

  ngOnInit(): void {
      this.pageInfo$ = this.store.select(getPageInfo).pipe(
        filter((info) => !!info),
        tap((info) => {
          this.tableMessage =
            info.totalRows === 0
              ? { emptyMessage: this.messageService.getEmptyMessageFromTableKey() }
              : { emptyMessage: undefined };
        }),
      );
      this.subscriptions.push(this.setPageNumber(), this.pageChangeEvent());
      this.loadPage(0);
  }

  ngAfterContentInit(): void {
    if (this.tableViews.length <= 0) {
      throw new Error(
        'Tabellen innehåller inga komponenter för vyerna "desktop" och/eller "mobile"!',
      );
    }
    this.initTable();
    this.initFilterChangeListening();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  checkIfStoredActiveRow(): void {
    if (this.isMobileView) {
      this.store
        .select(getActiveRow())
        .pipe(take(1))
        .subscribe((row: number) => {
          this.scrollIntoWiew(row);
        });
    }
  }

  scrollIntoWiew(row: number): void {
    if (row > 0 && document.getElementById(row.toString())) {
      document.getElementById(row.toString()).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      this.store.dispatch(clearActiveRow());
    }
  }

  setPageNumber(): Subscription {
    return this.store
      .select(getCurrentPageNumber)
      .pipe(filter((page) => !!page))
      .subscribe((pageNumber) => (this.pageNumber = pageNumber));
  }

  pageChangeEvent(): Subscription {
    let isFirstPageChange = true;
    return this.distinctPageChangeSubject.asObservable().subscribe((pageNumber: number) => {
      if (!isFirstPageChange) {
        this.pageNumber = pageNumber;
      }
      this.pageService.pageChangeSubject$.next({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      });
      isFirstPageChange = false;
    });
  }

  get isCheckboxTableSelectionType(): boolean {
    return this.selectionType === TableSelectionType.checkbox;
  }

  get isMobileView(): boolean {
    return this.screenWidth <= 768;
  }

  get hasFilterComponents(): boolean {
    return this.filterComponents.length > 0;
  }

  initTable(): void {
    if (this.tableViews.length > 0) {
      this.displayedColumns = this.tableViews
        .find((t) => (this.isMobileView ? t.isMobileView : t.isDesktopView))
        .tableColumns()
        .map((t) => ({
          header: t.columnHeader,
          columnWidth: parseInt(t.flexWidth, 10),
          headerClass: t.columnHeaderClass,
          sortKey: t.columnSortKey,
          templateRef: t.templateRef,
        }));
    }

    if (this.customFooterComponent) {
      this.customFooterTemplateRef = this.customFooterComponent.getTemplateRef(this.isMobileView);
    }
  }

  initFilterChangeListening(): void {
    if (!this.hasFilterComponents) {
      return this.store.dispatch(loadFilters({ filters: [] }));
    }

    const filterChangeTriggeredBy$ = new Subject<FilterResult>();
    let componentsValueChange$: Observable<any>[];

    this.store.pipe(select(getFilters), take(1)).subscribe((storedFilters: FilterResult[]) => {
      componentsValueChange$ = this.filterComponents.map((component: BaseFilterDirective) => {
        const storedFilterComponent =
          storedFilters.find((f) => f.type === component.type && f.name === component.name) ||
          ({} as FilterResult);

        const initFilterValue = storedFilterComponent.value || component.initValue || '';

        if (component.type !== FilterType.DropDownFilter) {
          component.setValue(initFilterValue);
        } else {
          if (initFilterValue) {
            component.setValue(initFilterValue.value || initFilterValue);
          } else if ((component as DropDownFilterComponent).initObservableValue) {
            (component as DropDownFilterComponent).initObservableValue
              .pipe(take(1))
              .subscribe((initValue) => {
                component.onValueChange({ value: initValue }, true);
              });
          }
        }

        return component.valueChange.pipe(
          startWith(component.getFilterValue()),
          distinctUntilChangedIfOtherThanButton(component),
          tap((filterValue: FilterResult) => filterChangeTriggeredBy$.next(filterValue)),
        );
      });

      this.subscriptions.push(
        combineLatest(componentsValueChange$)
          .pipe(withLatestFrom(filterChangeTriggeredBy$))
          .subscribe(([filterValues]: [FilterResult[], FilterResult]) => {
            this.store.dispatch(loadFilters({ filters: filterValues }));
          }),
      );
    });
  }

  loadPage(pageNumber: number): void {
    this.distinctPageChangeSubject.next(pageNumber);
  }

  getRowIndex(row: any): number {
    return this.table.bodyComponent.getRowIndex(row);
  }

  onActivate(event): void {
    // För att få till både rad och checkbox klick så använder vi "activate" tillsammans med "select"
    // när vi har "selectionType" satt till "checkbox"
    const isSelectionTypeCheckbox = this.selectionType === TableSelectionType.checkbox;
    const isClickEvent = event.type === 'click';
    const isClickInCheckboxCell = event.cellIndex === 0; // klick i första columnen/cellen
    if (isClickEvent && isSelectionTypeCheckbox && !isClickInCheckboxCell) {
      this.rowClick.emit({ row: event.row, index: this.getRowIndex(event.row) });
    }
  }

  onSelect({ selected }: { selected: [] }): void {
    if (!selected) {
      return;
    }
    if (this.selectionType === TableSelectionType.checkbox) {
      return this.selectChange.emit(selected);
    }
    this.rowClick.emit({ row: selected.first(), index: this.getRowIndex(selected.first()) });
  }

  getInitSortOrderObservable(): Observable<Array<{ prop: string; dir: string }>> {
    return this.store.select(getSort).pipe(
      filter((sort) => !!sort),
      map((sort) => {
        return [{ prop: 'sort-' + sort.key, dir: sort.direction }];
      }),
    );
  }

  onSort(event: any): void {
    this.pageService.sortChangeSubject$.next({
      key: cleanSortKey(event.column.prop),
      direction: event.newValue,
    });
  }
}
