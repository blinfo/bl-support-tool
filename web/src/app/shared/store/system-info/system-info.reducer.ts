import * as fromRoot from '../../../reducers';
import { Action, createReducer, on } from '@ngrx/store';
import {
  clearSystemInfoState,
  loadSystemInfoFailure,
  loadSystemInfoSuccess,
} from './system-info.actions';
import { HttpErrorResponse } from '@angular/common/http';

export const systemInfoFeatureKey = 'systemInfo';

export interface State extends fromRoot.State {
  error: HttpErrorResponse;
}

export const initialState: State = {
  error: undefined,
};

const systemInfoReducer = createReducer(
  initialState,
  on(loadSystemInfoSuccess, (state, action) => ({
    ...state,
    systemInfo: action.systemInfo,
  })),
  on(loadSystemInfoFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(clearSystemInfoState, () => initialState),
);

export function reducer(state: State, action: Action): State {
  return systemInfoReducer(state, action);
}
