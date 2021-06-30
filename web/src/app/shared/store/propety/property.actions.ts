import { createAction, props } from '@ngrx/store';
import { Property } from '../../models/property';
import { HttpErrorResponse } from '@angular/common/http';

export const loadProperties = createAction('[Property] Load Properties');

export const loadPropertiesSuccess = createAction(
  '[Property] Load Properties Success',
  props<{ properties: Property[] }>(),
);

export const loadPropertiesFailure = createAction(
  '[Property] Load Properties Failure',
  props<{ error: HttpErrorResponse }>(),
);
