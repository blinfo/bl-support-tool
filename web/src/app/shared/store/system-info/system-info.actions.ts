import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { SystemInfo } from '@shared/models/system-info';

export const loadSystemInfo = createAction('[SystemInfo] Load System Info');
export const loadSystemInfoSuccess = createAction(
  '[SystemInfo] Load System Info Success',
  props<{ systemInfo: SystemInfo[] }>(),
);
export const loadSystemInfoFailure = createAction(
  '[SystemInfo] Update System Info Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const updateSystemInfo = createAction(
  '[SystemInfo] Update System Info',
  props<{ data: SystemInfo }>(),
);
export const updateSystemInfoSuccess = createAction('[SystemInfo] Update System Info Success');
export const updateSystemInfoFailure = createAction(
  '[SystemInfo] Create System Info Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const createSystemInfo = createAction(
  '[SystemInfo] Create System Info',
  props<{ data: SystemInfo }>(),
);
export const createSystemInfoSuccess = createAction('[SystemInfo] Create System Info Success');
export const createSystemInfoFailure = createAction(
  '[SystemInfo] Create System Info Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const deleteSystemInfo = createAction(
  '[SystemInfo] Delete System Info',
  props<{ id: number }>(),
);
export const deleteSystemInfoSuccess = createAction('[SystemInfo] Delete System Info Success');
export const deleteSystemInfoFailure = createAction(
  '[SystemInfo] Delete System Info Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const clearSystemInfoState = createAction('[SystemInfo] Clear State');
