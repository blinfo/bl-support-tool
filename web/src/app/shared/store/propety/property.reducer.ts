import * as fromRoot from '../../../reducers';
import { Property } from '../../models/property';
import { Action, createReducer, on } from '@ngrx/store';
import { loadPropertiesFailure, loadPropertiesSuccess } from './property.actions';
import { HttpErrorResponse } from '@angular/common/http';

export const propertyFeatureKey = 'property';

export interface State extends fromRoot.State {
  properties: Property[];
  error: HttpErrorResponse;
}

export const initialState: State = {
  properties: undefined,
  error: undefined
};

const propertyReducer = createReducer(
  initialState,
  on(loadPropertiesSuccess, (state, action) => ({
    ...state,
    properties: action.properties
  })),
  on(loadPropertiesFailure, (state, action) => ({
    ...state,
    error: action.error
  }))
);

export function reducer(state: State, action: Action): State {
  return propertyReducer(state, action);
}
