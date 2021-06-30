import * as fromRoot from '../../../reducers';
import { Solution } from '../../models/solution';
import { HttpErrorResponse } from '@angular/common/http';
import { Action, createReducer, on } from '@ngrx/store';
import {
  clearSubscriptionState,
  loadModulesFailure,
  loadModulesSuccess,
  loadSolutionsFailure,
  loadSolutionsSuccess,
} from './subscription.actions';
import { Module } from '@shared/models/module';

export const subscriptionFeatureKey = 'subscription';

export interface State extends fromRoot.State {
  solutions: Solution[];
  modules: Module[];
  error: HttpErrorResponse;
}

export const initialState: State = {
  solutions: undefined,
  modules: undefined,
  error: undefined
};

const subscriptionReducer = createReducer(
  initialState,
  on(loadSolutionsSuccess, (state, action) => ({
    ...state,
    solutions: action.solutions
  })),
  on(loadModulesSuccess, (state, action) => ({
    ...state,
    modules: action.modules
  })),
  on(loadSolutionsFailure, loadModulesFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(clearSubscriptionState, () => initialState)
);

export function reducer(state: State, action: Action): State {
  return subscriptionReducer(state, action);
}
