import { createAction, props } from '@ngrx/store';
import { ApiKey } from '../../enums/api-key';
import { PageRequest } from '../../models/page-request';
import { FilterResult } from '../../filters';
import { Page } from '../../interfaces/page';

export const loadPage = createAction('[Table] Load Page', props<{ pageRequest: PageRequest }>());

export const loadingPage = createAction('[Table] Loading Page');

export const loadNextPage = createAction(
  '[Table] Load Next Page',
  props<{ pageRequest: PageRequest }>(),
);

export const loadPrevPage = createAction(
  '[Table] Load Prev Page',
  props<{ pageRequest: PageRequest }>(),
);

export const loadPageSuccess = createAction(
  '[Table] Load Page Success',
  props<{ page: Page<any> }>(),
);

export const loadPageFailure = createAction('[Table] Load Page Failure', props<{ error: any }>());

export const updateCurrentPage = createAction(
  '[Table] Update Current Page',
  props<{ pageNumber: number; size: number }>(),
);

export const updateActiveRow = createAction(
  '[Table] Update Active Row',
  props<{ activeRow: number }>(),
);

export const clearActiveRow = createAction('[Table] Clear Active Row');

export const loadFilters = createAction(
  '[Table] Load Filters',
  props<{ filters: FilterResult[] }>(),
);

export const clearTableData = createAction('[Table] Clear Table');

export const clearTableState = createAction('[Table] Clear State');

export const setRowData = createAction(
  '[Table] Set Row Data',
  props<{ data: any; identifier: string }>(),
);

export const updateRows = createAction(
  '[Table] Update Rows',
  props<{ data: any[]; identifier: string; requestType: ApiKey; showSnackbar: boolean }>(),
);

export const updateRowsSuccess = createAction(
  '[Table] Update Rows Success',
  props<{ data: any[]; identifier: string }>(),
);

export const updateRowsFailure = createAction(
  '[Table] Update Rows Failure',
  props<{ error: any }>(),
);
