import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationService } from '@core/services/authentication.service';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { loadSolutions } from '@shared/store/subscription/subscription.actions';
import { getUser } from '@shared/store/auth/auth.selectors';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Blapp Support/Säljverktyg';

  constructor(
    private authService: AuthenticationService,
    private msalService: MsalService,
    private store: Store<State>,
  ) {}

  ngOnInit(): void {
    this.getAccount();

    this.store
      .select(getUser)
      .pipe(
        filter(user => !!user),
        take(1),
      )
      .subscribe(() => this.loadSolution());
  }

  getAccount(): void {
    this.authService.setUser();
  }

  loadSolution(): void {
    this.store.dispatch(loadSolutions());
  }
}
