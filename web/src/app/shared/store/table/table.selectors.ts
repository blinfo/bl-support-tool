import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TableState } from './table.state';
import { tableFeatureKey } from './table.reducer';

const getTableFeatureState = createFeatureSelector<TableState>(tableFeatureKey);

export const getPageInfo = createSelector(
  getTableFeatureState,
  state => {
    return state.pageInfo;
  }
);

export const getFilters = createSelector(
  getTableFeatureState,
  state => {
    return state.filters;
  }
);

export const getCurrentPageNumber = createSelector(
  getTableFeatureState,
  state => {
    return state.pageInfo?.currentPageNumber;
  }
);

export const getSort = createSelector(
  getTableFeatureState,
  state => state.sort
);

export const getData = createSelector(
  getTableFeatureState,
  state => {
    return state.content;
  }
);

export const getDataFilteredBy = (prop: string, value: any ) =>
  createSelector(getData, data => data.filter(item => item[prop] === value));

export const getActiveRow = () =>
  createSelector(getTableFeatureState, state => {
    return state.activeRow;
  });
