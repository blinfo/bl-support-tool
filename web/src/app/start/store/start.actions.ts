import { createAction, props } from '@ngrx/store';
import { Moment } from 'moment';

export const loadUniqueUsersLogin = createAction(
  '[Start] Load Unique Users Login',
  props<{ date: Moment }>()
);

export const loadUniqueUsersLoginSuccess = createAction(
  '[Start] Load Unique Users Login Success',
  props<{
    userLoginCount: number
  }>()
);

export const loadUniqueUsersLoginFailure = createAction(
  '[Start] Load Unique Users Login Failure',
  props<{ error: any}>()
);

export const loadCreatedUsers = createAction(
  '[Start] Load Created Users',
  props<{ date: Moment }>()
);

export const loadCreatedUsersSuccess = createAction(
  '[Start] Load Created Users Success',
  props<{
    usersCreatedCount: number
  }>()
);

export const loadCreatedUsersFailure = createAction(
  '[Start] Load Created Users Failure',
  props<{ error: any}>()
);

export const clearStartState = createAction(
  '[Start] Clear State',
  props<{
    error: any
  }>()
);

export const loadCreatedUsersOfMonth = createAction(
  '[Start] Load Created of Month',
  props<{ date: Moment }>()
);

export const loadCreatedUsersOfMonthSuccess = createAction(
  '[Start] Load Created of Month Success',
  props<{ createdUsersOfMonth: { name: string, value: number }[] }>()
);

export const loadCreatedUsersOfMonthFailure = createAction(
  '[Start] Load Created of Month Failure',
  props<{ error: any }>()
);
