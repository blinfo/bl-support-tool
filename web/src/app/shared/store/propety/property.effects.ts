import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PropertyHttpService } from '@core/services/http/property-http.service';
import { loadPropertiesFailure, loadPropertiesSuccess } from './property.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { setUser } from '@shared/store/auth/auth.actions';

@Injectable()
export class PropertyEffects {
  constructor(private actions$: Actions, private propertyHttpService: PropertyHttpService) {}

  loadProperties = createEffect(() =>
    this.actions$.pipe(
      ofType(setUser),
      mergeMap(() =>
        this.propertyHttpService.getAll().pipe(
          map(properties => loadPropertiesSuccess({ properties })),
          catchError((error: HttpErrorResponse) => of(loadPropertiesFailure({ error }))),
        ),
      ),
    ),
  );
}
