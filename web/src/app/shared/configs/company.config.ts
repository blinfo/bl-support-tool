import { DropdownItem } from '../models/dropdown-item';
import { TEXT } from '@shared/text.constants';

export const companySearchKeys: DropdownItem[] = [
  {
    title: TEXT.company.searchText,
    value: '',
  },
  {
    title: TEXT.company.emailPortalAddress,
    value: 'emailPortalAddress',
  },
  {
    title: TEXT.company.publicKey,
    value: 'publicKey',
  },
  {
    title: TEXT.company.payingCustomerNumber,
    value: 'payingCustomerNumber',
  },
  {
    title: TEXT.company.allocatingCustomerNumber,
    value: 'allocatingCustomerNumber',
  },
  {
    title: TEXT.company.firmCustomerNumber,
    value: 'firmCustomerNumber',
  },
];
