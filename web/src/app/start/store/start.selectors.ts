import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStart from './start.reducer';

const selectedStartState = createFeatureSelector<fromStart.State>(fromStart.startFeatureKey);

export const getUniqueUserLogins = createSelector(
  selectedStartState,
  state => state.userLoginCount,
);
export const getUsersCreated = createSelector(selectedStartState, state => state.usersCreatedCount);
export const getCreatedUserOfMonth = createSelector(
  selectedStartState,
  state => state.createdUsersOfMonth,
);
export const getCountCreatedUserOfMonth = createSelector(selectedStartState, state => {
  let count = 0;
  Array.safe(state.createdUsersOfMonth).forEach(day => {
    count = count + day.value;
  });
  return count;
});
