import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { getSelectedEnvironment } from '@shared/store/auth/auth.selectors';
import { Environment } from '@shared/enums/Environment';
import { map } from 'rxjs/operators';
import { setEnvironment } from '@shared/store/auth/auth.actions';
import { AuthenticationService } from '../../services/authentication.service';
import { MsalUser } from '@shared/models/msal-user';
import { DropdownItem } from '@shared/models/dropdown-item';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
})
export class TopMenuComponent implements OnInit {
  @Input() isExpanded: boolean;
  @Input() screenWidth: number;
  @Input() nav;
  @Input() user$: Observable<MsalUser>;

  @Output() toggleMenuChange: EventEmitter<void> = new EventEmitter();

  dropDownOptions: DropdownItem[] = [];
  selectedEnvironment$: Observable<DropdownItem>;
  environments: DropdownItem[] = Environment.getEnvironmentsAsDropdownList();

  constructor(private store: Store<State>, private msService: AuthenticationService) {}

  ngOnInit(): void {
    this.buildDropdownOptions();
    this.selectedEnvironment$ = this.store.select(getSelectedEnvironment).pipe(
      map(selected => {
        return {
          value: selected,
          title: selected.toUpperCase(),
          readOnly: false,
          compareValue: selected,
        };
      }),
    );
  }

  onToggleMenuClick(): void {
    this.toggleMenuChange.emit();
  }

  openNav(): void {
    this.nav.open();
  }

  onEnvironmentSelect(selected: DropdownItem): void {
    this.store.dispatch(setEnvironment({ environment: selected.value }));
  }

  buildDropdownOptions(): void {
    const logOut = {
      title: 'Logga ut',
      value: 'logout',
      readOnly: false,
    };
    this.dropDownOptions.push(logOut);
  }

  login(): void {
    this.msService.login();
  }

  selectedOption(event): void {
    if (event.value === 'logout') {
      this.msService.logout();
    }
  }

  getRolesAsDropDownItem(roles: string[]): string {
    return roles.join(', ');
  }
}
