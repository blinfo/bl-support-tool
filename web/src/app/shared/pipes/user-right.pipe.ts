import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRight'
})
export class UserRightPipe implements PipeTransform {

  transform(prop: string): string {
    switch (prop) {
      case 'accountingView':
        return 'Ekonomiöversikt';
      case 'invoicing':
        return 'Fakturering';
      case 'cashRegister':
        return 'Kassarapport';
      case 'receiptManagement':
        return 'Kvittohantering';
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
      case 'accounting':
        return 'Bokföring';
      default:
        return prop;
    }
  }

}
