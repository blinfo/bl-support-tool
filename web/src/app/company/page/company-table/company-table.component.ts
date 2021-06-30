import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Company } from '@shared/models/company';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from '@core/services/table.service';
import { getData } from '@shared/store/table/table.selectors';
import { TableSortService } from '@core/services/table-sort.service';
import { ApiKey } from '@shared/enums/api-key';
import { PageRequest } from '@shared/models/page-request';
import { TablePageService } from '@core/services/table-page.service';
import { FilterResult, FilterType } from '../../../shared/filters';
import { companySearchKeys } from '@app/shared/configs/company.config';
import { loadMenu } from '@shared/store/menu/menu.actions';
import { TEXT } from '@shared/text.constants';

@Component({
  templateUrl: './company-table.component.html',
})
export class CompanyTableComponent implements OnInit, OnDestroy {
  companies$: Observable<Company[]>;
  subscriptions: Subscription[] = [];

  searchValues = companySearchKeys;
  selectedSearchValue = this.searchValues.first();

  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    private tableService: TableService,
    private sortService: TableSortService,
    private pageService: TablePageService,
  ) {}

  ngOnInit(): void {
    this.setMenu(TEXT.company.title);
    this.subscriptions = [this.tableEvent()];
    this.companies$ = this.store.select(getData);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  tableEvent(): Subscription {
    return this.pageService
      .tableHandler()
      .subscribe(({ page, filters, sorting, isFirstActionChange }) => {
        const isTriggeredByFilter = filters.timestamp > page.timestamp;
        const isTriggeredBySorting = sorting.timestamp > page.timestamp;
        const forceReload = !isFirstActionChange && (isTriggeredByFilter || isTriggeredBySorting);
        const pageRequest: PageRequest = {
          apiKey: ApiKey.Company,
          sort: sorting.value,
          pageNumber: forceReload ? 1 : page.value.pageNumber,
          size: page.value.pageSize,
          requestData: this.filterFunction(filters.value),
        };
        this.setQueryParams(pageRequest);
        this.pageService.loadPage(pageRequest, forceReload);
      });
  }

  rowClick(event: { index: number; row: Company }): void {
    this.openCompanyDetails(event.row);
  }

  openCompanyDetails(company: Company): void {
    this.router.navigate([`companies/${company.id}`], { state: { data: { company } } }).then();
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
    const search = Array.safe(filters)
      .filter(f => f.type === FilterType.SearchFilter)
      .first()?.value;
    if (search) {
      return `${search.text}&filter=${search.requestType ?? ''}`;
    }
    return '';
  }

  private setMenu(title: string): void {
    this.store.dispatch(loadMenu({ title, hidden: false, parentUrl: '' }));
  }
}
