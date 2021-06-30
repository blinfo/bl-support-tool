import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { loadUserPhotoFailure, loadUserPhotoSuccess, setEnvironment, setUser } from './auth.actions';
import { of } from 'rxjs';
import { AuthenticationService } from '@core/services/authentication.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private msService: AuthenticationService) {}

  setEnvironment$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setEnvironment),
        tap(action => localStorage.setItem('environment', action.environment))
      ),
    { dispatch: false }
  );

  loadUserPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setUser),
      mergeMap(() =>
        this.msService.getUserPhoto().pipe(
          map((imgUrl) => loadUserPhotoSuccess({ imgUrl })),
          catchError((error) => of(loadUserPhotoFailure({ error })))
        )
      )
    )
  );
}
