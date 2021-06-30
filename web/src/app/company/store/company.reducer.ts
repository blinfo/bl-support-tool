import * as fromRoot from '../../reducers';
import { Action, createReducer, on } from '@ngrx/store';
import {
  clearCompanyState,
  loadBankStatusFailure,
  loadBankStatusSuccess,
  loadCompanySubscriptionFailure, loadCompanySubscriptionSuccess,
  loadIntegrationsFailure,
  loadIntegrationsSuccess,
  loadSkvConnectionFailure,
  loadSkvConnectionSuccess,
} from './company.actions';
import { BankStatus } from '@shared/interfaces/bank-status';
import { HttpErrorResponse } from '@angular/common/http';
import { Integration } from '@shared/models/integration';
import { SkvConnection } from '@shared/interfaces/skv-connection';
import { SubscriptionStats } from '@shared/interfaces/subscription-stats';

export const companyFeatureKey = 'company-shell';

export interface State extends fromRoot.State {
  bankStatus: BankStatus;
  integrations: Integration[];
  error: HttpErrorResponse;
  skvConnection: SkvConnection;
  subscription: SubscriptionStats;
}

export const initialState: State = {
  bankStatus: undefined,
  integrations: undefined,
  error: undefined,
  skvConnection: undefined,
  subscription: undefined,
};

const companyReducer = createReducer(
  initialState,
  on(loadBankStatusSuccess, (state, action) => ({
    ...state,
    bankStatus: action.bankStatus,
  })),
  on(loadIntegrationsSuccess, (state, action) => ({
    ...state,
    integrations: action.integrations,
  })),
  on(loadSkvConnectionSuccess, (state, action) => ({
    ...state,
    skvConnection: action.skvConnection,
  })),
  on(loadCompanySubscriptionSuccess, (state, action) => ({
    ...state,
    subscription: action.subscription,
  })),
  on(
    loadBankStatusFailure,
    loadSkvConnectionFailure,
    loadCompanySubscriptionFailure,
    loadIntegrationsFailure,
    (state, action) => ({
      ...state,
      error: action.error,
    }),
  ),
  on(clearCompanyState, () => initialState),
);

export function reducer(state: State, action: Action): State {
  return companyReducer(state, action);
}
