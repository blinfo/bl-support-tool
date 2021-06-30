import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Timestamp } from 'rxjs';
import { getSort } from '../../shared/store/table/table.selectors';
import { map, take, timestamp } from 'rxjs/operators';
import { State } from '../../reducers';
import { Sort } from '../../shared/interfaces/sort';
import { FilterResult } from '@shared/filters';

@Injectable({
  providedIn: 'root',
})
export class TableSortService {
  constructor(private store: Store<State>) {}

  sortTableData(a: any, b: any, isAsc: boolean): number {
    if (!isNaN(a)) {
      return (a > b ? 1 : -1) * (isAsc ? 1 : -1);
    } else {
      return this.compareData(a, b, isAsc);
    }
  }

  compareData(a: any, b: any, isAsc: boolean): number {
    const reA = /[^a-zA-Z]/g;
    const reN = /[^0-9]/g;
    const aA = a.replace(reA, '');
    const bA = b.replace(reA, '');
    if (aA === bA) {
      const aN = parseInt(a.replace(reN, ''), 10);
      const bN = parseInt(b.replace(reN, ''), 10);
      return (aN === bN ? 0 : aN > bN ? 1 : -1) * (isAsc ? 1 : -1);
    } else {
      return (aA > bA ? 1 : -1) * (isAsc ? 1 : -1);
    }
  }

  getSortObservable(
    page: Timestamp<{ pageNumber: number; pageSize: number }>,
    filters: Timestamp<FilterResult[]>,
    sorting: Timestamp<Sort>,
    isFirstActionChange: boolean
  ): Observable<{
        page: Timestamp<{ pageNumber: number; pageSize: number }>,
        filters: Timestamp<FilterResult[]>,
        sorting: Timestamp<Sort>,
        isFirstActionChange: boolean
    }> {
    if (isFirstActionChange) {
      return this.store.select(getSort).pipe(
        take(1),
        timestamp(),
        map(sort => ({ page, filters, sorting: sort, isFirstActionChange})
      ));
    }
    return of({ page, filters, sorting, isFirstActionChange});
  }
}
