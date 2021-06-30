import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { MsalService } from '@azure/msal-angular';
import { Menu } from '@shared/models/menu';
import { MENU_ITEMS } from '@shared/configs/menu.config';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  menus: Menu[] = MENU_ITEMS;

  constructor(
    private router: Router,
    private store: Store<State>,
    private msalService: MsalService
  ) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const account = this.msalService.getAccount();
    const rolesKey = 'roles';
    const userRoles = (account?.idToken[rolesKey] as unknown) as string[];
    const accessRoles = this.menus.find((menu) =>
      this.checkIfMatchingPath(menu, this.getConfiguredUrl(next))
    ).roleAccess;
    return !!(
      !Array.hasValues(accessRoles) ||
      userRoles.find((role) => this.checkArrayIfContainsValue(role, accessRoles))
    );
  }

  checkArrayIfContainsValue(valueToCheck: any, array: any[]): boolean {
    return array.find((item) => item === valueToCheck);
  }

  getConfiguredUrl(route: ActivatedRouteSnapshot): string {
    return (
      '/' +
      route.pathFromRoot
        .filter((v) => Array.hasValues(v.url))
        .filter((v) => v.routeConfig)
        .map((v) => v.routeConfig.path)
        .join('/')
    );
  }

  checkIfMatchingPath(menu: Menu, url: string): boolean {
    if (menu.path === url) {
      return true;
    }

    if (Array.hasValues(menu.children)) {
      return menu.children.some((subMenu) => this.checkIfMatchingPath(subMenu, url));
    }
    return false;
  }
}
