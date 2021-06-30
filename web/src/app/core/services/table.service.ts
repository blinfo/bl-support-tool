import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor() {}

  mapParamsToPageData(params: ParamMap): { page: PageEvent; sort: Sort; searchValue: string } {
    return {
      page: {
        pageIndex: params.get('page') ? parseInt(params.get('page'), 10) : 0,
        pageSize: params.get('size') ? parseInt(params.get('size'), 10) : 25,
        length: 0,
      },
      sort: {
        active: params.get('sortKey') ? params.get('sortKey') : '',
        direction: this.getSortDirection(params.get('sortDir')),
      },
      searchValue: params.get('search') ? params.get('search') : '',
    };
  }

  getSortDirection(dir: string): SortDirection {
    switch (dir) {
      case 'asc':
        return 'asc';
      case 'desc':
        return 'desc';
      default:
        return '';
    }
  }
}
