import * as fromProperty from './property.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserRight } from '../../models/user-right';

const getPropertyFeatureState = createFeatureSelector<fromProperty.State>(
  fromProperty.propertyFeatureKey,
);

export const getPropertiesFilteredByUserRights = (userRights: UserRight[]) =>
  createSelector(getPropertyFeatureState, state => {
    return state.properties
      .filter(
        property =>
          !userRights.find(
            userRight => userRight.property.key === property.key,
          ),
      )
      .sort((a, b) => displayName(a.key).localeCompare(displayName(b.key)));
  });

const displayName = (key: string) => {
  switch (key) {
    case 'accountingView':
      return 'Ekonomiöversikt';
    case 'invoicing':
      return 'Fakturering';
    case 'cashRegister':
      return 'Kassarapport';
    case 'receiptManagement':
      return 'Kvittohantering - Endast egna kvitton';
    case 'receiptManagement.viewAll':
      return 'Kvittohantering - Alla kvitton';
    case 'attest':
      return 'Attest';
    case 'blaep':
      return 'E-postportal';
    case 'blato':
      return 'Tolkning';
    case 'blaai':
      return 'Rådgivarverktyg';
    case 'bankPayment':
      return 'Bank & Betalning';
    case 'salaryView':
      return 'Lönebesked';
    case 'admin':
      return 'Administratör';
    default:
      return key;
  }
};
