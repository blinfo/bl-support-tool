import * as fromCompany from './company.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BankStatus } from '@shared/interfaces/bank-status';
import { TEXT } from '@shared/text.constants';
import { BankError } from '@shared/interfaces/bank-error';
import { DetailCard } from '@shared/models/detail-card';
import { Integration } from '@shared/models/integration';
import { SkvConnection } from '@shared/interfaces/skv-connection';

const selectCompanyState = createFeatureSelector<fromCompany.State>(fromCompany.companyFeatureKey);

export const getBankStatus = createSelector(selectCompanyState, state =>
  state?.bankStatus
    ? new DetailCard<{ name: string; value: any }[]>(
        TEXT.bank.name,
        '',
        !state.bankStatus.bankError
          ? getBankStatusAsDetailContent(state.bankStatus)
          : getBankErrorAsDetailContent(state.bankStatus.bankError),
      )
    : undefined,
);

export const getIntegrations = createSelector(selectCompanyState, state =>
  state.integrations
    ? new DetailCard<Integration[]>(
        TEXT.integration.integrations,
        TEXT.integration.description,
        Array.safe(state.integrations).map(integration => ({
          name: '',
          value: integration.serviceProvider.name,
        })),
      )
    : undefined,
);

export const getSkvConnection = createSelector(selectCompanyState, state =>
  state.skvConnection?.skvNumber && state.skvConnection?.skvInitiator
    ? getSkvConnectionAsDetailContent(state.skvConnection)
    : undefined,
);

export const getCompanySubscription = createSelector(
  selectCompanyState,
  state => state.subscription,
);

function getBankStatusAsDetailContent(status: BankStatus): { name: string; value: any }[] {
  return [
    { name: TEXT.bank.bank, value: getBankName(status.context) },
    { name: TEXT.bank.iban, value: status.iban },
    { name: TEXT.bank.active, value: status.isActive },
    { name: TEXT.bank.userKey, value: status.user_key },
    { name: TEXT.bank.assignmentId, value: status.assignment_id },
    { name: TEXT.bank.lastTransfer, value: status.last_transfer },
  ];
}

function getBankErrorAsDetailContent(error: BankError): { name: string; value: any }[] {
  return [
    { name: TEXT.bank.timeStamp, value: error.timestamp },
    { name: TEXT.bank.status, value: error.status },
    { name: TEXT.bank.error, value: error.error },
    { name: TEXT.bank.message, value: error.message },
    { name: TEXT.bank.path, value: error.path },
  ];
}

function getSkvConnectionAsDetailContent(connection: SkvConnection): DetailCard<SkvConnection> {
  return new DetailCard<SkvConnection>(TEXT.skv.name, TEXT.skv.description, [
    { name: TEXT.skv.skvNumber, value: connection.skvNumber },
    { name: TEXT.skv.skvInitiator, value: connection.skvInitiator },
  ]);
}

const getBankName = (context: string): string => {
  switch (context) {
    case 'seb':
      return TEXT.bank.seb;
    case 'hb':
      return TEXT.bank.hb;
    default:
      return context;
  }
};
