import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import {
  deleteUserRights,
  deleteUserRightsFailure,
  deleteUserRightsSuccess,
  loadCompany,
  loadCompanyFailure,
  loadCompanySuccess,
  loadConnectionProperties,
  loadConnectionPropertiesFailure,
  loadConnections,
  loadConnectionsFailure,
  loadConnectionsSuccess,
  loadUserSubscription,
  loadUserSubscriptionFailure,
  loadUserSubscriptionSuccess,
  setNotificationProperties,
  setUserRights,
  updateUserRights,
  updateUserRightsFailure,
  updateUserRightsSuccess,
} from './user.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { CompanyHttpService } from '@core/services/http/company-http.service';
import { ConnectionHttpService } from '@core/services/http/connection-http.service';
import { loadingPage } from '@shared/store/table/table.actions';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { SubscriptionHttpService } from '@core/services/http/subscription-http.service';
import { ErrorText } from '@shared/error.constants';
import { MessageType } from '@shared/interfaces/snackbar-message';
import { PathText } from '@shared/path.constants';
import { Router } from '@angular/router';
import { BlSnackbarService } from '@core/services/bl-snackbar.service';
import { ConnectionPropertyService } from '@core/services/connection-property.service';
import { ConnectionPropertiesHttpService } from '../../core/services/http/connection-properties-http.service';
import { UserRight } from '../../shared/models/user-right';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRightService } from '../../core/services/user-right.service';

@Injectable()
export class UserEffects {
  constructor(
    private store: Store<State>,
    private actions$: Actions,
    private companyHttpService: CompanyHttpService,
    private subscriptionsHttpService: SubscriptionHttpService,
    private connectionHttpService: ConnectionHttpService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private snackbarService: BlSnackbarService,
    private connectionPropertyService: ConnectionPropertyService,
    private connectioPropertyHttpService: ConnectionPropertiesHttpService,
    private userRightService: UserRightService,
  ) {}

  loadConnections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConnections),
      tap(() => this.store.dispatch(loadingPage())),
      mergeMap(action =>
        this.connectionHttpService.getConnectionsByUserId(action.userId).pipe(
          map(connections => loadConnectionsSuccess({ connections })),
          catchError(error => of(loadConnectionsFailure({ error }))),
        ),
      ),
    ),
  );

  loadCompanyDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompany),
      mergeMap(({ connection }) =>
        this.companyHttpService.getCompanyByPublicKey(connection.publicKey).pipe(
          mergeMap(company => [
            loadCompanySuccess({ company }),
            loadConnectionProperties({ connectionId: connection.id }),
          ]),
          catchError(error => {
            this.handleError(connection.publicKey);
            return of(loadCompanyFailure({ error }));
          }),
        ),
      ),
    ),
  );

  loadUserSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserSubscription),
      mergeMap(({ connectionId }) =>
        this.subscriptionsHttpService.getByConnectionId(connectionId).pipe(
          map(userSubscription => loadUserSubscriptionSuccess({ userSubscription })),
          catchError(error => of(loadUserSubscriptionFailure({ error }))),
        ),
      ),
    ),
  );

  loadConnectionProperties$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConnectionProperties),
      mergeMap(action =>
        this.connectionHttpService.getPropertiesByConnectionId(action.connectionId).pipe(
          mergeMap(connectionProperties => [
            setUserRights({
              userRights: connectionProperties
                .map(prop => UserRight.propertyToUserRight(prop))
                .filter(userRight =>
                  this.userRightService.filterNonUserRights(userRight.property.key),
                ),
            }),
            setNotificationProperties({
              notificationProperties: this.connectionPropertyService.getNotificationFromConnectionProperties(
                connectionProperties,
              ),
            }),
          ]),
          catchError(error => of(loadConnectionPropertiesFailure({ error }))),
        ),
      ),
    ),
  );

  updateUserRights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserRights),
      map(action => action.userRights.map(userRight => UserRight.toConnectionProperty(userRight))),
      mergeMap(userRights =>
        forkJoin(
          userRights.map(prop => {
            if (prop.id) {
              return this.connectioPropertyHttpService.update(prop);
            }
            return this.connectioPropertyHttpService.create(prop);
          }),
        ).pipe(
          map(connectionProperties =>
            updateUserRightsSuccess({
              userRights: connectionProperties.map(prop => UserRight.propertyToUserRight(prop)),
            }),
          ),
          catchError(error => of(updateUserRightsFailure({ error }))),
        ),
      ),
    ),
  );

  deleteUserRights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserRights),
      mergeMap(action =>
        forkJoin(action.ids.map(id => this.connectioPropertyHttpService.delete(id))).pipe(
          map(() => deleteUserRightsSuccess({ ids: action.ids })),
          catchError(error => of(deleteUserRightsFailure({ error }))),
        ),
      ),
    ),
  );

  @Effect({ dispatch: false })
  loadingSpinnerShow$ = this.actions$.pipe(
    ofType(loadingPage, updateUserRights, deleteUserRights),
    tap(() => this.spinnerService.show()),
  );

  @Effect({ dispatch: false })
  loadingSpinnerHide$ = this.actions$.pipe(
    ofType(
      loadConnectionsSuccess,
      loadConnectionsFailure,
      updateUserRightsSuccess,
      updateUserRightsFailure,
      deleteUserRightsSuccess,
      deleteUserRightsFailure,
    ),
    tap(() => this.spinnerService.hide()),
  );

  private showErrorSnackbar(publicKey: string): void {
    this.snackbarService.show({
      headerText: ErrorText.invalidId,
      contentText: `Kunde inte hitta företag med nyckel ${publicKey}`,
      type: MessageType.ERROR,
      duration: 10000,
    });
  }

  private handleError(publicKey: string): void {
    this.navigateBack();
    this.showErrorSnackbar(publicKey);
  }

  private navigateBack(): void {
    this.router.navigate([PathText.users]);
  }
}
