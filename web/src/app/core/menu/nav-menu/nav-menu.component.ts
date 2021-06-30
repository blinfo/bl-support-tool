import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { AuthenticationService } from '../../services/authentication.service';
import { getUser } from '@shared/store/auth/auth.selectors';
import { MsalUser } from '@shared/models/msal-user';
import { filter, tap } from 'rxjs/operators';
import { loadSolutions } from '@shared/store/subscription/subscription.actions';
import { loadSystemInfo } from '@app/shared/store/system-info/system-info.actions';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  screenWidth: number;
  isExpanded = true;
  hideNavBar = false;
  user$: Observable<MsalUser>;

  @ViewChild('navMenu', { static: true }) public nav: MatSidenav;

  constructor(private msService: AuthenticationService, private store: Store<State>) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.onWindowResize();
    };
  }

  ngOnInit(): void {
    this.user$ = this.store.select(getUser).pipe(
      tap((user: MsalUser) => {
        if (user) {
          this.store.dispatch(loadSystemInfo());
        }
      }),
    );
  }

  onWindowResize(): void {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 768) {
      this.nav.open();
    }
    if (this.screenWidth <= 768) {
      this.nav.close();
    }
    if (this.screenWidth <= 1280) {
      this.isExpanded = false;
    }
    if (this.screenWidth >= 1281) {
      this.isExpanded = true;
    }
  }

  toggleMenu(): boolean {
    return (this.isExpanded = !this.isExpanded);
  }
}
