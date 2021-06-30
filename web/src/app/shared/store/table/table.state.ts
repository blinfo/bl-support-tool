import { PageInfo } from '../../models/page-info';
import { FilterResult } from '../../filters';
import { Sort } from '../../interfaces/sort';

export interface TableState {
  content: any[];
  errors: string[];
  pageInfo: PageInfo;
  filters: FilterResult[];
  sort: Sort;
  activeRow: number;
}

export const initialTableState: TableState = {
  content: [],
  errors: undefined,
  pageInfo: undefined,
  filters: [],
  sort: undefined,
  activeRow: 0,
};
