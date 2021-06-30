import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PageInfo } from '../../models/page-info';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit, OnDestroy {
  @Input() paginatorData$: Observable<{ currentPage: number; totalPages: number }>;
  @Input() maxPages = 7;
  @Input() hideRowCount = false;
  @Input() hidePagination = false;
  @Input() pageInfo$: Observable<PageInfo>;
  @Input() isMobileView = false;

  @Output() pageEmitter = new EventEmitter<number>();

  pager: { class: string; innerHTML: string; number: any }[] = [];
  currentPage: number;
  totalPages: number;
  currentRows: string;
  totalRows: number;
  subscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.pageInfo$
        .pipe(
          filter(
            (info) =>
              !!info?.currentPageNumber &&
              !!info.size &&
              info.totalPages !== undefined &&
              info.totalRows !== undefined,
          ),
        )
        .subscribe((data) => {
          const offset = data.currentPageNumber * data.size;
          this.totalPages = data.totalPages;
          this.totalRows = data.totalRows;
          this.currentRows =
            data.totalRows > 0
              ? ` ${!this.isMobileView ? offset - (data.size - 1) : 1}-${
                  offset <= data.totalRows ? offset : data.totalRows
                } `
              : '0';
          this.paginate(data.currentPageNumber, data.totalPages);
          if (this.currentPage !== data.currentPageNumber) {
            this.currentPage = data.currentPageNumber;
          }
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
  }

  onPageChange(pageNumber: number | string): void {
    if (
      pageNumber <= this.totalPages &&
      pageNumber > 0 &&
      pageNumber !== this.currentPage &&
      typeof pageNumber === 'number' &&
      isFinite(pageNumber)
    ) {
      this.currentPage = pageNumber;
      this.pageEmitter.emit(pageNumber);
      this.paginate(this.currentPage, this.totalPages);
    }
  }

  paginate(currentPage: number, totalPages: number): void {
    const maxPages = this.maxPages >= totalPages ? totalPages : this.maxPages;
    this.pager = [];
    let startPage = 2;
    let startDots = false;
    let endDots = false;
    if (totalPages > 2) {
      if (totalPages <= maxPages) {
        this.pager = Array.from(Array(totalPages - 2).keys()).map((i) => {
          return {
            class: 'px-4 py-2 border-r border-bl-grey-200 hover:bg-bl-grey-100 cursor-pointer',
            innerHTML: `<span>${startPage + i}</span>`,
            number: startPage + i,
          };
        });
      } else {
        if (currentPage < maxPages - 2) {
          startPage = 2;
          endDots = true;
        } else if (currentPage > totalPages - (maxPages - 3)) {
          startPage = totalPages - 5;
          startDots = true;
        } else {
          startPage = currentPage - Math.floor((maxPages - 2) / 2);
          startDots = true;
          endDots = true;
        }
        this.pager = Array.from(Array(maxPages - 2).keys()).map((i) => ({
          class: 'px-4 py-2 border-r border-bl-grey-200 hover:bg-bl-grey-100 cursor-pointer',
          innerHTML: `<span>${startPage + i}</span>`,
          number: startPage + i,
        }));
        if (startDots) {
          this.pager[0] = {
            class: 'px-4 py-2 border-r border-bl-grey-200',
            innerHTML: `<span>...</span>`,
            number: '...',
          };
        }
        if (endDots) {
          this.pager[this.pager.length - 1] = {
            class: 'px-4 py-2 border-r border-bl-grey-200 cursor-default',
            innerHTML: `<span>...</span>`,
            number: '...',
          };
        }
      }
    }
  }

  canLoadMoreItems(): boolean {
    return this.currentPage < this.totalPages;
  }
}
