import { Component, OnDestroy, OnInit } from '@angular/core';
import { BankHttpService } from '@core/services/http/bank-http.service';
import { Company } from '@shared/models/company';
import { DetailCard } from '@shared/models/detail-card';
import { BankService } from '../../services/bank.service';
import { Observable } from 'rxjs';
import { State } from '@app/reducers';
import { Store } from '@ngrx/store';
import {
  getBankStatus,
  getCompanySubscription,
  getIntegrations,
  getSkvConnection,
} from '../../store/company.selectors';
import { clearCompanyState, loadCompanySubscription, loadData } from '../../store/company.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyHttpService } from '@core/services/http/company-http.service';
import { Integration } from '@shared/models/integration';
import { SkvConnection } from '@shared/interfaces/skv-connection';
import { loadMenu } from '@shared/store/menu/menu.actions';
import { filter, mergeMap, take, tap } from 'rxjs/operators';
import { SubscriptionStats } from '@shared/interfaces/subscription-stats';
import { BlSnackbarService } from '@core/services/bl-snackbar.service';
import { MessageType } from '@shared/interfaces/snackbar-message';
import { ErrorText } from '@shared/error.constants';
import { HttpErrorResponse } from '@angular/common/http';
import { PathText } from '@shared/path.constants';
import { HttpError } from '@shared/interfaces/http-error';

@Component({
  templateUrl: './company.component.html',
})
export class CompanyComponent implements OnInit, OnDestroy {
  bankStatus$: Observable<DetailCard<{ name: string; value: any }[]>>;
  integrations$: Observable<DetailCard<Integration[]>>;
  skvConnection$: Observable<DetailCard<SkvConnection>>;
  company: Company;
  companySubscription$: Observable<SubscriptionStats>;
  multipleDetailColumns = false;

  constructor(
    private bankService: BankService,
    private bankHttpService: BankHttpService,
    private companyHttpService: CompanyHttpService,
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: BlSnackbarService,
  ) {}

  ngOnInit(): void {
    const state = history.state?.data;
    state?.company ? this.init(state.company) : this.getCompanyFromApi();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearCompanyState());
  }

  getCompanyFromApi(): void {
    this.route.paramMap
      .pipe(
        filter(params => !!params.get('id')),
        take(1),
        mergeMap(params => this.companyHttpService.getCompanyById(params.get('id'))),
      )
      .subscribe(
        company => this.init(company),
        (error: HttpErrorResponse) => this.handleError(error),
      );
  }

  setCompanyDetails(company: Company): void {
    this.company = company;
  }

  private navigateBack(): void {
    this.router.navigate([PathText.companies]);
  }

  init(company: Company): void {
    this.setMenu(`#${company.id} - ${company.name}`);
    this.setCompanyDetails(company);
    this.store.dispatch(loadData({ company }));
    if (company.isConnectedToBlApp) {
      this.store.dispatch(loadCompanySubscription({ publicKey: company.publicKey }));
    }
    this.companySubscription$ = this.store
      .select(getCompanySubscription)
      .pipe(tap(sub => (this.multipleDetailColumns = !!sub)));
    this.bankStatus$ = this.store.select(getBankStatus);
    this.integrations$ = this.store.select(getIntegrations);
    this.skvConnection$ = this.store.select(getSkvConnection);
  }

  private setMenu(title: string): void {
    this.store.dispatch(loadMenu({ title, hidden: false, parentUrl: PathText.companies }));
  }

  private showErrorSnackbar(error: HttpError): void {
    this.snackbarService.show({
      headerText: ErrorText.invalidId,
      contentText: error.message,
      type: MessageType.ERROR,
      duration: 10000
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.navigateBack();
    this.showErrorSnackbar(error.error);
  }
}
