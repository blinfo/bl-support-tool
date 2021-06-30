import { createAction, props } from '@ngrx/store';

export const loadMenu = createAction(
  '[Menu] Load Menu',
  props<{ title: string, hidden: boolean, parentUrl: string }>()
);
export const clearMenuState = createAction(
  '[Menu] Clear State'
);
