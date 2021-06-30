import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MsalService } from '@azure/msal-angular';
import { MsalUser } from '@shared/models/msal-user';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { setUser } from 'src/app/shared/store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private msalService: MsalService,
    private store: Store<State>,
  ) {}

  getUserPhoto(): Observable<string> {
    const requestUrl = `https://graph.microsoft.com/v1.0/me/photo/$value`;
    return this.http.get(requestUrl, { responseType: 'blob' }).pipe(
      map(result => {
        const url = window.URL;
        return url.createObjectURL(result);
      }),
    );
  }

  setUser(): void {
    const rolesKey = 'roles';
    const account = this.msalService.getAccount();

    if (!!account) {
      this.store.dispatch(
        setUser({
          user: new MsalUser(
            account.name,
            account.userName,
            (account.idToken[rolesKey] as unknown) as string[],
          ),
        }),
      );
    }
  }

  login(): void {
    this.msalService.loginRedirect();
  }

  logout(): void {
    this.msalService.logout();
  }
}
