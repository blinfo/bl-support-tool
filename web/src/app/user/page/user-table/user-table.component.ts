import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BlappUser } from '@shared/models/blapp-user';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '@core/services/table.service';
import { TableSortService } from '@core/services/table-sort.service';
import { TablePageService } from '@core/services/table-page.service';
import { getData } from '@shared/store/table/table.selectors';
import { PageRequest } from '@shared/models/page-request';
import { ApiKey } from '@shared/enums/api-key';
import { FilterResult, FilterType } from '@shared/filters';
import { updateActiveRow } from '@app/shared/store/table/table.actions';
import { loadMenu } from '@shared/store/menu/menu.actions';
import { TEXT } from '@shared/text.constants';

@Component({
  templateUrl: './user-table.component.html',
})
export class UserTableComponent implements OnInit, OnDestroy {
  users$: Observable<BlappUser[]>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    private tableService: TableService,
    private sortService: TableSortService,
    private pageService: TablePageService,
  ) {}

  ngOnInit(): void {
    this.setMenu(TEXT.users);
    this.subscriptions = [this.tableEvent()];
    this.users$ = this.store.select(getData);
  }

  tableEvent(): Subscription {
    return this.pageService
      .tableHandler()
      .subscribe(({ page, filters, sorting, isFirstActionChange }) => {
        const isTriggeredByFilter = filters.timestamp > page.timestamp;
        const isTriggeredBySorting = sorting.timestamp > page.timestamp;
        const forceReload = !isFirstActionChange && (isTriggeredByFilter || isTriggeredBySorting);
        const pageRequest: PageRequest = {
          apiKey: ApiKey.User,
          sort: sorting.value,
          pageNumber: forceReload ? 1 : page.value.pageNumber,
          size: page.value.pageSize,
          requestData: this.filterFunction(filters.value),
        };
        this.setQueryParams(pageRequest);
        this.pageService.loadPage(pageRequest, forceReload);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onUserClick(event: { row: BlappUser; index: number }): void {
    this.openUserDetails(event.row);
    this.updateActiveRow(event.index);
  }

  openUserDetails(user: BlappUser): void {
    this.router.navigate([`users/${user.id}`], { state: { data: { user } } }).then();
  }

  updateActiveRow(activeRow: number): void {
    this.store.dispatch(updateActiveRow({ activeRow }));
  }

  setQueryParams(page: PageRequest): void {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: page.pageNumber,
          size: page.size,
          sortKey: page.sort?.key,
          sortDir: page.sort?.direction,
          search: page.requestData,
        },
      })
      .then();
  }

  filterFunction(filters: FilterResult[]): string {
    const searchQuery = Array.safe(filters)
      .filter(f => f.type === FilterType.TextFilter)
      .firstOrDefault({ value: '' });
    return searchQuery.value;
  }

  private setMenu(title: string): void {
    this.store.dispatch(loadMenu({ title, hidden: false, parentUrl: '' }));
  }
}
