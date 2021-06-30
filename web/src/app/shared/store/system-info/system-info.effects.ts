import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {SystemInfoHttpService} from '@app/core/services/http/system-info-http.service';
import {
  createSystemInfo,
  createSystemInfoSuccess,
  deleteSystemInfo,
  deleteSystemInfoFailure,
  deleteSystemInfoSuccess,
  loadSystemInfo,
  loadSystemInfoFailure,
  loadSystemInfoSuccess,
  updateSystemInfo,
  updateSystemInfoSuccess,
} from '@app/shared/store/system-info/system-info.actions';
import {State} from './system-info.reducer';
import {Store} from '@ngrx/store';
import {BlSnackbarService} from '@app/core/services/bl-snackbar.service';
import {MessageType, SnackbarMessage} from '@app/shared/interfaces/snackbar-message';

@Injectable()
export class SystemInfoEffects {
  constructor(
    private actions$: Actions,
    private systemInfoHttpService: SystemInfoHttpService,
    private store: Store<State>,
    private snackbarService: BlSnackbarService,
  ) {}

  @Effect()
  loadSystemInfo$ = this.actions$.pipe(
    ofType(
      loadSystemInfo,
      updateSystemInfoSuccess,
      createSystemInfoSuccess,
      deleteSystemInfoSuccess,
    ),
    mergeMap(() =>
      this.systemInfoHttpService.getSystemInfo().pipe(
        map(systemInfo => loadSystemInfoSuccess({ systemInfo })),
        catchError(error => of(loadSystemInfoFailure({ error }))),
      ),
    ),
  );

  @Effect()
  updateInfo$ = this.actions$.pipe(
    ofType(updateSystemInfo),
    mergeMap(data =>
      this.systemInfoHttpService.updateSystemInfo(data.data).pipe(
        map(() => {
          this.showSnackbar('Infomeddelandet uppdaterades', MessageType.SUCCESS);
          return updateSystemInfoSuccess();
        }),
        catchError(error => {
          this.showSnackbar('Kunde inte uppdatera posten', MessageType.ERROR);
          return of(loadSystemInfoFailure({ error }));
        }),
      ),
    ),
  );

  @Effect()
  createSystemInfo$ = this.actions$.pipe(
    ofType(createSystemInfo),
    tap(() => console.log('tittut')),
    mergeMap(data =>
      this.systemInfoHttpService.createSystemInfo(data.data).pipe(
        map(() => {
          this.showSnackbar('Infomeddelandet skapades', MessageType.SUCCESS);
          return createSystemInfoSuccess();
        }),
        catchError(error => {
          this.showSnackbar('Kunde inte skapa posten', MessageType.ERROR);
          return of(loadSystemInfoFailure({ error }));
        }),
      ),
    ),
  );

  @Effect()
  deleteSystemInfo$ = this.actions$.pipe(
    ofType(deleteSystemInfo),
    mergeMap(({ id }) =>
      this.systemInfoHttpService.deleteSystemInfo(id).pipe(
        map(() => {
          this.showSnackbar('Infomeddelandet togs bort', MessageType.SUCCESS);
          return deleteSystemInfoSuccess();
        }),
        catchError(error => {
          this.showSnackbar('Kunde inte ta bort posten', MessageType.ERROR);
          return of(deleteSystemInfoFailure({ error }));
        }),
      ),
    ),
  );

  showSnackbar(contentText: string, snackbarType: MessageType): void {
    const headerText = snackbarType === MessageType.SUCCESS ? 'Hurra' : 'Något gick fel';
    const snackbarItem: SnackbarMessage = {
      headerText: headerText,
      contentText: contentText,
      type: snackbarType,
      dismissable: true,
    };
    this.snackbarService.show(snackbarItem);
  }
}
