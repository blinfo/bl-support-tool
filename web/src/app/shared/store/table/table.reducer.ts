import { Action, createReducer, on } from '@ngrx/store';
import {
  clearTableData,
  clearTableState,
  loadFilters,
  loadPageFailure,
  loadPageSuccess,
  setRowData,
  updateCurrentPage,
  updateRowsFailure,
  updateRowsSuccess,
  updateActiveRow,
  clearActiveRow,
} from './table.actions';
import { initialTableState, TableState } from './table.state';
import { PageInfo } from '../../models/page-info';

export const tableFeatureKey = 'table';

const tableReducer = createReducer(
  initialTableState,
  on(loadPageSuccess, (state, action) => ({
    ...state,
    content: action.page.content,
    pageInfo: { ...state.pageInfo, ...PageInfo.fromPage(action.page) },
    sort: action.page.requestedSort ? { key: action.page.requestedSort.key, direction: action.page.requestedSort.direction } : undefined,
    errors: [],
  })),
  on(loadPageFailure, (state, action) => ({
    ...state,
    content: [],
    errors: [...state.errors, action.error],
  })),
  on(updateCurrentPage, (state, action) => ({
    ...state,
    pageInfo: {
      ...state.pageInfo,
      currentPageNumber: action.pageNumber,
      size: action.size,
    },
  })),
  on(loadFilters, (state, action) => ({
    ...state,
    filters: action.filters,
  })),
  on(updateRowsSuccess, setRowData, (state, action) => ({
    ...state,
    content: [
      ...updateRows(
        state.content,
        Array.isArray(action.data) ? action.data : [action.data],
        action.identifier,
      ),
    ],
  })),
  on(updateRowsFailure, (state, action) => ({
    ...state,
    errors: [...state.errors, action.error],
  })),
  on(updateActiveRow, (state, action) => ({
    ...state,
    activeRow: action.activeRow,
  })),
  on(clearActiveRow, (state) => ({
    ...state,
    activeRow: initialTableState.activeRow,
  })),
  on(clearTableData, (state) => ({
    ...state,
    content: initialTableState.content,
  })),
  on(clearTableState, () => initialTableState),
);

const updateRows = (dataArray: any[], rows: any[], identifier: string) => {
  return dataArray.map((item) => {
    const newRow = rows.find((row) => item[identifier] === row[identifier]);

    if (newRow) {
      return { ...newRow };
    } else {
      return item;
    }
  });
};

export function reducer(state: TableState, action: Action): any {
  return tableReducer(state, action);
}
