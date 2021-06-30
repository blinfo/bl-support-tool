import * as fromRoot from '../../reducers';
import { Action, createReducer, on } from '@ngrx/store';
import {
  clearStartState,
  loadCreatedUsersFailure,
  loadCreatedUsersOfMonthFailure,
  loadCreatedUsersOfMonthSuccess,
  loadCreatedUsersSuccess,
  loadUniqueUsersLoginFailure,
  loadUniqueUsersLoginSuccess,
} from './start.actions';

export const startFeatureKey = 'start';

export interface State extends fromRoot.State {
  userLoginCount: number;
  usersCreatedCount: number;
  createdUsersOfMonth: { name: string; value: number }[];
  error: any;
}

export const initialState: State = {
  userLoginCount: undefined,
  usersCreatedCount: undefined,
  createdUsersOfMonth: undefined,
  error: undefined,
};

const startReducer = createReducer(
  initialState,
  on(loadUniqueUsersLoginSuccess, (state, action) => ({
    ...state,
    userLoginCount: action.userLoginCount,
  })),
  on(loadUniqueUsersLoginFailure, loadCreatedUsersFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(loadCreatedUsersSuccess, (state, action) => ({
    ...state,
    usersCreatedCount: action.usersCreatedCount,
  })),
  on(loadCreatedUsersOfMonthSuccess, (state, action) => ({
    ...state,
    createdUsersOfMonth: action.createdUsersOfMonth,
  })),
  on(loadCreatedUsersOfMonthFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(clearStartState, () => initialState),
);

export function reducer(state: State, action: Action): any {
  return startReducer(state, action);
}
