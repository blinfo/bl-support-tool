import { BankError } from './bank-error';

export interface BankStatus {
  iban: string;
  since: string;
  context: string;
  user_key: string;
  isActive: boolean;
  last_poll: string;
  bankError: BankError;
  assignment_id: string;
  last_transfer: string;
  accountBalance: number;
  accountBalanceDate: string;
}
