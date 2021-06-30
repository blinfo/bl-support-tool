import { Sort } from './sort';

export class Page<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: PageSort;
  totalElements: number;
  totalPages: number;
  requestedSort: Sort;
}

export class Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: PageSort;
  unpaged: boolean;
}

export class PageSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
