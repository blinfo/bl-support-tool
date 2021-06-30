import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { BankStatus } from '@shared/interfaces/bank-status';
import { Company } from '@shared/models/company';
import { Integration } from '@shared/models/integration';
import { SkvConnection } from '@shared/interfaces/skv-connection';
import { SubscriptionStats } from '@shared/interfaces/subscription-stats';

export const loadData = createAction('[Company] Load Data', props<{ company: Company }>());
export const loadBankStatusSuccess = createAction(
  '[Company] Load Bank Status Success',
  props<{ bankStatus: BankStatus }>(),
);
export const loadBankStatusFailure = createAction(
  '[Company] Load Bank Status failure',
  props<{ error: HttpErrorResponse }>(),
);
export const loadIntegrationsSuccess = createAction(
  '[Company] Load Integrations Success',
  props<{ integrations: Integration[] }>(),
);
export const loadIntegrationsFailure = createAction(
  '[Company] Load Integrations Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const loadSkvConnectionSuccess = createAction(
  '[Company] Load Skv Connection Success',
  props<{ skvConnection: SkvConnection }>(),
);
export const loadSkvConnectionFailure = createAction(
  '[Company] Load Skv Connection failure',
  props<{ error: HttpErrorResponse }>(),
);
export const loadCompanySubscription = createAction(
  '[Company] Load Subscription',
  props<{ publicKey: string }>()
);
export const loadCompanySubscriptionSuccess = createAction(
  '[Company] Load Subscription Success',
  props<{ subscription: SubscriptionStats }>()
);
export const loadCompanySubscriptionFailure = createAction(
  '[Company] Load Subscription Failure',
  props<{ error: HttpErrorResponse }>()
);
export const clearCompanyState = createAction('[Company] Clear State');
