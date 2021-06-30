import { createAction, props } from '@ngrx/store';
import { MsalUser } from '../../models/msal-user';

export const setUser = createAction('[Auth] Set User', props<{ user: MsalUser }>());
export const loadUserPhotoSuccess = createAction(
  '[Auth] Load User Photo Success',
  props<{ imgUrl: string }>(),
);
export const loadUserPhotoFailure = createAction(
  '[Auth] Load User Photo Failure',
  props<{ error: any }>(),
);
export const setEnvironment = createAction(
  '[Auth] Set Environment',
  props<{ environment: string }>(),
);
