import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

const selectUserState = createFeatureSelector<fromUser.State>(fromUser.userFeatureKey);

export const getConnections = createSelector(selectUserState, state => state.connections);
export const getCompany = createSelector(selectUserState, state => state.company);
export const getUserSubscription = createSelector(selectUserState, state => state.userSubscription);
export const getUserRights = createSelector(selectUserState, state => state.userRights);
