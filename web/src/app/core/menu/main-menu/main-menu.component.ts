import { Component, Input, OnInit } from '@angular/core';
import { Menu } from '@shared/models/menu';
import { MENU_ITEMS } from '@shared/configs/menu.config';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { getRoles } from '@shared/store/auth/auth.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent implements OnInit {
  @Input() screenWidth: number;
  @Input() isExpanded: boolean;
  @Input() badgeData: any;

  menuItems$: Observable<Menu[]>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.menuItems$ = this.store.select(getRoles).pipe(
      map(roles => {
        return MENU_ITEMS.filter(item => {
          return (
            item.roleAccess.filter(role => roles.filter(r => r === role).length > 0).length > 0
          );
        });
      }),
    );
  }

  trackByFn(index, item: Menu): any {
    return item.id || index;
  }

  hasBadgeValue(menuItem): boolean {
    const isEnabled = menuItem.badge && menuItem.badge.enabled === true;
    const hasValue = !!this.getBadgeValue(menuItem);

    return isEnabled && hasValue;
  }

  getBadgeValue(menuItem): any {
    if (this.badgeData && menuItem.badge && menuItem.badge.messageProperty) {
      return this.badgeData[menuItem.badge.messageProperty];
    }
    return undefined;
  }
}
