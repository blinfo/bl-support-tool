import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlappUser } from '@shared/models/blapp-user';
import { ConnectionHttpService } from '@core/services/http/connection-http.service';
import { DropdownItem } from '@shared/models/dropdown-item';
import { Connection } from '@shared/models/connection';
import { ConnectionService } from '@core/services/connection.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import {
  clearSelectedConnection,
  clearUserState,
  loadCompany,
  loadConnections,
  loadUserSubscription,
} from '../../store/user.actions';
import { getConnections, getUserSubscription } from '../../store/user.selectors';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import { UserHttpService } from '@core/services/http/user-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { loadMenu } from '@shared/store/menu/menu.actions';
import { UserSubscription } from '@shared/interfaces/user-subscrption';
import { MessageType } from '@shared/interfaces/snackbar-message';
import { BlSnackbarService } from '@core/services/bl-snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorText } from '@shared/error.constants';
import { PathText } from '@shared/path.constants';
import { TEXT } from '@shared/text.constants';
import { HttpError } from '@shared/interfaces/http-error';

@Component({
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, OnDestroy {
  user: BlappUser;
  selectedConnection: DropdownItem;
  connections$: Observable<DropdownItem[]>;
  userSubscription$: Observable<UserSubscription>;

  firstOption: DropdownItem = {
    title: TEXT.company.dropdownTitle,
    value: new Connection(),
    readOnly: false,
    compareValue: 0,
  };

  constructor(
    private userHttpService: UserHttpService,
    private connectionHttpService: ConnectionHttpService,
    private connectionService: ConnectionService,
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: BlSnackbarService,
  ) {}

  ngOnInit(): void {
    const state = history.state?.data;
    if (state?.user) {
      this.init(state.user);
    } else {
      this.getUserFromApi();
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearUserState());
  }

  onUserChange(user: BlappUser): void {
    this.setMenu(`#${user.id} - ${user.name}`);
    this.userHttpService.updateUser(user).subscribe();
  }

  onConnectionSelect(connection: DropdownItem): void {
    if (connection.compareValue !== this.selectedConnection.compareValue) {
      this.store.dispatch(clearSelectedConnection());
      this.selectedConnection = connection;
      if (connection.compareValue !== 0) {
        this.store.dispatch(loadCompany({ connection: connection.value }));
        this.store.dispatch(loadUserSubscription({ connectionId: connection.value.id }));
      }
    }
  }

  private getUserFromApi(): void {
    this.route.paramMap
      .pipe(
        filter(params => !!params.get('id')),
        take(1),
        mergeMap(params => this.userHttpService.getUser(params.get('id'))),
      )
      .subscribe(
        user => this.init(user),
        (error: HttpErrorResponse) => this.handleError(error),
      );
  }

  private navigateBack(): void {
    this.router.navigate([PathText.users]);
  }

  private setConnectedCompanies(): void {
    this.connections$ = this.store.select(getConnections).pipe(
      filter(con => !!con),
      map(connections => {
        this.selectedConnection = { ...this.firstOption };
        return [this.firstOption].concat(this.connectionService.getAsDropdownItems(connections));
      }),
    );
  }

  private init(user: BlappUser): void {
    this.setMenu(`#${user.id} - ${user.name}`);
    this.user = user;
    this.store.dispatch(loadConnections({ userId: user.id }));
    this.setConnectedCompanies();
    this.userSubscription$ = this.store.select(getUserSubscription);
  }

  private setMenu(title: string): void {
    this.store.dispatch(loadMenu({ title, hidden: false, parentUrl: PathText.users }));
  }

  private showErrorSnackbar(error: HttpError): void {
    this.snackbarService.show({
      headerText: ErrorText.invalidId,
      contentText: error.message,
      type: MessageType.ERROR,
      duration: 10000,
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.navigateBack();
    this.showErrorSnackbar(error.error);
  }
}
