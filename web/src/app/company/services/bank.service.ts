import { Injectable } from '@angular/core';
import { BankStatus } from '@shared/interfaces/bank-status';
import { BankError } from '@shared/interfaces/bank-error';
import { TEXT } from '@shared/text.constants';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  constructor() {}

  getBankStatusAsDetailContent(status: BankStatus): { name: string; value: any }[] {
    return [
      { name: TEXT.bank.bank, value: this.getBankName(status.context) },
      { name: TEXT.bank.iban, value: status.iban },
      { name: TEXT.bank.active, value: status.isActive },
      { name: TEXT.bank.userKey, value: status.user_key },
      { name: TEXT.bank.assignmentId, value: status.assignment_id },
      { name: TEXT.bank.lastTransfer, value: status.last_transfer },
    ];
  }

  getBankErrorAsDetailContent(error: BankError): { name: string; value: any }[] {
    return [
      { name: TEXT.bank.timeStamp, value: error.timestamp },
      { name: TEXT.bank.status, value: error.status },
      { name: TEXT.bank.error, value: error.error },
      { name: TEXT.bank.message, value: error.message },
      { name: TEXT.bank.path, value: error.path },
    ];
  }

  private getBankName(context: string): string {
    switch (context) {
      case 'seb':
        return TEXT.bank.seb;
      case 'hb':
        return TEXT.bank.hb;
      default:
        return context;
    }
  }
}
