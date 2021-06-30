import * as fromRoot from '../../../reducers';
import { Action, createReducer, on } from '@ngrx/store';
import { loadUserPhotoFailure, loadUserPhotoSuccess, setEnvironment, setUser } from './auth.actions';
import { MsalUser } from '../../models/msal-user';
import { Environment } from '../../enums/Environment';

export const authFeatureKey = 'auth';

export interface State extends fromRoot.State {
  user: MsalUser;
  error: any;
  environment: string;
}

export const initialState: State = {
  user: undefined,
  error: undefined,
  environment: getCachedEnvironment(),
};

const authReducer = createReducer(
  initialState,
  on(setUser, (state, action) => ({
    ...state,
    user: action.user,
  })),
  on(loadUserPhotoSuccess, (state, action) => ({
    ...state,
    user: setUserPhoto(action.imgUrl, state.user)
  })),
  on(loadUserPhotoFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(setEnvironment, (state, action) => ({
    ...state,
    environment: action.environment
  })),
);

export function reducer(state: State, action: Action): any {
  return authReducer(state, action);
}

function getCachedEnvironment(): string {
  return localStorage.getItem('environment') ? localStorage.getItem('environment') : Environment.Production;
}

function setUserPhoto(userPhoto: string, user: MsalUser): MsalUser {
  return { ...user, photo: userPhoto};
}
