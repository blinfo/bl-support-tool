import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject, Timestamp } from 'rxjs';
import { map, mergeMap, skip, tap, timestamp, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { clearTableData, loadNextPage, loadPage, loadPrevPage, updateCurrentPage } from '@shared/store/table/table.actions';
import { State } from 'src/app/reducers';
import { PageRequest } from '@shared/models/page-request';
import { FilterResult } from '@shared/filters';
import { getFilters } from '@shared/store/table/table.selectors';
import { Sort } from '@shared/interfaces/sort';
import { TableSortService } from './table-sort.service';

@Injectable({ providedIn: 'root' })
export class TablePageService {
  public previousPageOffset = undefined;
  public sortChangeSubject$ = new BehaviorSubject<Sort>(undefined);
  public pageChangeSubject$ = new Subject<{ pageNumber: number; pageSize: number }>();

  constructor(private store: Store<State>, private sortService: TableSortService) {}

  loadPage(pageRequest: PageRequest, forceReload = false): void {
    if (forceReload) {
      this.clearTableData();
    }
    this.store.dispatch(loadPage({ pageRequest }));
    this.store.dispatch(
      updateCurrentPage({
        pageNumber: pageRequest.pageNumber,
        size: pageRequest.size,
      }),
    );
    setTimeout(() => {
      this.loadNextPage(pageRequest);
      this.loadPrevPage(pageRequest);
    }, 300);
  }

  pageSortChange(): Observable<Timestamp<Sort>> {
    return this.sortChangeSubject$.pipe(timestamp());
  }

  distinctPageChange(): Observable<Timestamp<{ pageNumber: number; pageSize: number }>> {
    return this.pageChangeSubject$.pipe(timestamp());
  }

  filterChange<T = void>(
    operatorFunction?: (filters: FilterResult[]) => T,
  ): Observable<Timestamp<T>> {
    if (operatorFunction) {
      return this.store.pipe(
        select(getFilters),
        skip(1), // Den här händer före init av filter så hoppar över första filtervärdena så det hinner sättas
        map(operatorFunction),
        timestamp(),
      );
    }
    return this.store.pipe(select(getFilters), skip(1), timestamp()) as Observable<Timestamp<T>>;
  }

  private loadNextPage(pageRequest: PageRequest): void {
    this.store.dispatch(
      loadNextPage({ pageRequest: { ...pageRequest, pageNumber: pageRequest.pageNumber + 1 } }),
    );
  }

  private loadPrevPage(pageRequest: PageRequest): void {
    this.store.dispatch(
      loadPrevPage({ pageRequest: { ...pageRequest, pageNumber: pageRequest.pageNumber - 1 } }),
    );
  }

  clearTableData(): void {
    this.store.dispatch(clearTableData());
  }

  tableHandler(): Observable<{
    page: Timestamp<{ pageNumber: number; pageSize: number }>;
    filters: Timestamp<FilterResult[]>;
    sorting: Timestamp<Sort>;
    isFirstActionChange: boolean;
  }> {
    return this.getTableActionsHandleObservable().pipe(
      mergeMap(
        ([[page, filters, sorting], isFirstActionChange]: [
          [Timestamp<{ pageNumber: number; pageSize: number }>, Timestamp<FilterResult[]>, Timestamp<Sort>],
          boolean,
        ]) => this.sortService.getSortObservable(page, filters, sorting, isFirstActionChange),
      ),
    );
  }

  getTableActionsHandleObservable(): Observable<
    [
      [Timestamp<{ pageNumber: number; pageSize: number }>, Timestamp<FilterResult[]>, Timestamp<Sort>],
      boolean,
    ]
  > {
    const pageSortChanged$ = this.pageSortChange();
    const pageDistinctChanged$ = this.distinctPageChange();
    const filterChanged$ = this.filterChange<FilterResult[]>();
    const init$ = new BehaviorSubject(true); // first/init turn of data passed to subscription

    if (history?.state?.forceTableDataReload) {
      this.store.dispatch(clearTableData());
    }
    return combineLatest(pageDistinctChanged$, filterChanged$, pageSortChanged$).pipe(
      withLatestFrom(init$),
      tap(() => init$.next(false)), // toggle init subject to false after the first run
    );
  }
}
