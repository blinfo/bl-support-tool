import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { loadingPage, loadPage, loadPageFailure, loadPageSuccess } from './table.actions';
import { Observable, of } from 'rxjs';
import { PageHttpService } from '@core/services/http/page-http.service';
import { State } from '@app/reducers';
import { PageRequest } from '../../models/page-request';
import { Page } from '../../interfaces/page';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({ providedIn: 'root' })
export class TableEffects {
  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private supportApiHttpService: PageHttpService,
    private spinnerService: NgxSpinnerService
  ) {}

  @Effect({ dispatch: false })
  loadingSpinnerShow$ = this.actions$.pipe(
    ofType(loadingPage),
    tap(() => this.spinnerService.show()),
  );

  @Effect({ dispatch: false })
  loadingSpinnerHide$ = this.actions$.pipe(
    ofType(loadPageSuccess, loadPageFailure),
    tap(() => this.spinnerService.hide()),
  );

  @Effect()
  loadPageData$ = this.actions$.pipe(
    ofType(loadPage),
    tap(() => this.store.dispatch(loadingPage())),
    switchMap(({ pageRequest }) => this.loadData(pageRequest)),
  );

  loadData(pageRequest: PageRequest): Observable<any> {
    return this.supportApiHttpService.getPage(pageRequest).pipe(
      map((page: Page<any>) => {
        return loadPageSuccess({ page });
      }),
      catchError(error => {
        return of(loadPageFailure({ error }));
      }),
    );
  }
}
