import { Component, Input, OnInit } from '@angular/core';
import { TEXT } from '@shared/text.constants';
import { Company } from '@shared/models/company';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { getRoles } from '@shared/store/auth/auth.selectors';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  @Input() multipleColumns: boolean;
  @Input() company: Company;

  publicKeyText = TEXT.company.publicKey;
  databaseNameText = TEXT.company.databaseName;
  idText = TEXT.company.id;
  emailText = TEXT.company.email;
  orgNumberText = TEXT.company.orgNumber;
  hostIdText = TEXT.company.hostId;
  firmCustomerNumberText = TEXT.company.firmCustomerNumber;
  allocatingCustomerNumberText = TEXT.company.allocatingCustomerNumber;
  connectedToBlAppText = TEXT.company.connectedToBlApp;
  payingCustomerNumberText = TEXT.company.payingCustomerNumber;

  hasAccessToSecretMenu$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.hasAccessToSecretMenu$ = this.store.select(getRoles).pipe(
      filter(roles => !!roles && roles.length > 0),
      map(roles => !!roles.find(role => role === 'Dev' || role === 'Admin')),
    );
  }

}
