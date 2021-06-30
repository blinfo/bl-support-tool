import { createAction, props } from '@ngrx/store';
import { Solution } from '../../models/solution';
import { HttpErrorResponse } from '@angular/common/http';
import { Module } from '@shared/models/module';

export const loadSolutions = createAction('[Subscription] Load Solutions');

export const loadSolutionsSuccess = createAction(
  '[Subscription] Load Solutions Success',
  props<{ solutions: Solution[] }>(),
);

export const loadSolutionsFailure = createAction(
  '[Subscription] Load Solutions Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const loadModulesSuccess = createAction(
  '[Subscription] Load Modules Success',
  props<{ modules: Module[] }>(),
);

export const loadModulesFailure = createAction(
  '[Subscription] Load Modules Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const clearSubscriptionState = createAction('[Subscription] Clear State');
