import { Component, OnInit } from '@angular/core';
import { TEXT } from '../../../shared/text.constants';
import { getCompany } from '../../store/user.selectors';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { Observable } from 'rxjs';
import { Company } from '../../../shared/models/company';
import { getRoles } from '../../../shared/store/auth/auth.selectors';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
})
export class CompanyInfoComponent implements OnInit {
  publicKeyText = TEXT.company.publicKey;
  idText = TEXT.company.id;
  emailText = TEXT.company.email;
  orgNumberText = TEXT.company.orgNumber;
  hostIdText = TEXT.company.hostId;
  firmCustomerNumberText = TEXT.company.firmCustomerNumber;
  allocatingCustomerNumberText = TEXT.company.allocatingCustomerNumber;
  payingCustomerNumberText = TEXT.company.payingCustomerNumber;

  hasAccessToSecretMenu$: Observable<boolean>;

  company$: Observable<Company>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.company$ = this.store.select(getCompany);
    this.hasAccessToSecretMenu$ = this.store.select(getRoles).pipe(
      filter(roles => !!roles && roles.length > 0),
      map(roles => !!roles.find(role => role === 'Dev' || role === 'Admin')),
    );
  }
}
