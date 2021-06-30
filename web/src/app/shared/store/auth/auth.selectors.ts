import * as fromAuth from './auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectAuthState = createFeatureSelector<fromAuth.State>(fromAuth.authFeatureKey);

export const getSelectedEnvironment = createSelector(selectAuthState, (state) => state.environment);
export const getUser = createSelector(selectAuthState, (state) => state.user);
export const getRoles = createSelector(selectAuthState, (state) => Array.safe(state.user?.roles));
