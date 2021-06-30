import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CompanyHttpService } from '@core/services/http/company-http.service';
import { BankHttpService } from '@core/services/http/bank-http.service';
import {
  loadBankStatusFailure,
  loadBankStatusSuccess,
  loadCompanySubscription,
  loadCompanySubscriptionSuccess,
  loadData,
  loadIntegrationsFailure,
  loadIntegrationsSuccess,
  loadSkvConnectionFailure,
  loadSkvConnectionSuccess,
} from '@app/company/store/company.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IntegrationHttpService } from '@core/services/http/integration-http.service';
import { SkvHttpService } from '@core/services/http/skv-http.service';
import { SubscriptionHttpService } from '@core/services/http/subscription-http.service';

@Injectable()
export class CompanyEffects {
  constructor(
    private actions$: Actions,
    private companyService: CompanyHttpService,
    private bankHttpService: BankHttpService,
    private integrationHttpService: IntegrationHttpService,
    private skvHttpService: SkvHttpService,
    private subscriptionHttpService: SubscriptionHttpService,
  ) {}

  @Effect()
  loadBankStatus$ = this.actions$.pipe(
    ofType(loadData),
    mergeMap(({ company }) =>
      this.bankHttpService.getStatus(company.publicKey).pipe(
        map(bankStatus => loadBankStatusSuccess({ bankStatus })),
        catchError(error => of(loadBankStatusFailure({ error }))),
      ),
    ),
  );

  @Effect()
  loadIntegrations$ = this.actions$.pipe(
    ofType(loadData),
    mergeMap(({ company }) =>
      this.integrationHttpService.getIntegrations(company.id).pipe(
        map(integrations => loadIntegrationsSuccess({ integrations })),
        catchError(error => of(loadIntegrationsFailure({ error }))),
      ),
    ),
  );

  @Effect()
  loadSkvConnection$ = this.actions$.pipe(
    ofType(loadData),
    mergeMap(({ company }) =>
      this.skvHttpService.getConnection(company.publicKey).pipe(
        map(skvConnection => loadSkvConnectionSuccess({ skvConnection })),
        catchError(error => of(loadSkvConnectionFailure({ error }))),
      ),
    ),
  );

  @Effect()
  loadSubscriptions$ = this.actions$.pipe(
    ofType(loadCompanySubscription),
    mergeMap(({ publicKey }) =>
      this.subscriptionHttpService.getCompanySubscriptionByPublicKey(publicKey).pipe(
        map(subscription => loadCompanySubscriptionSuccess({ subscription })),
        catchError(error => of(loadSkvConnectionFailure({ error }))),
      ),
    ),
  );
}
