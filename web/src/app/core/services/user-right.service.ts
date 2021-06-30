import { Injectable } from '@angular/core';
import { UserRight } from '../../shared/models/user-right';
import { Property } from '../../shared/models/property';
import { Connection } from '../../shared/models/connection';

@Injectable({
  providedIn: 'root',
})
export class UserRightService {
  constructor() {}

  setAdditionalSetting(userRights: UserRight[]): UserRight[] {
    return userRights
      .filter(userRight => this.filterAdditionalUserRights(userRight.property.key))
      .map(userRight => {
        if (userRight.property.key === 'attest') {
          userRight = {
            ...userRight,
            additionalSetting: this.getChildrenOfAttest(userRights, userRight.connection),
          };
        }
        if (userRight.property.key === 'receiptManagement') {
          userRight = {
            ...userRight,
            additionalSetting: this.getChildrenOfReceiptManagement(
              userRights,
              userRight.connection,
            ),
          };
        }
        return userRight;
      });
  }

  getChildrenOfAttest(userRights: UserRight[], connection: Connection): UserRight {
    const additional = userRights.filter(prop => prop.property.key === 'supplierView');
    if (additional?.length === 0) {
      return new UserRight(null, new Property('supplierView', 'boolean'), false, connection);
    }
    return additional.first();
  }

  getChildrenOfReceiptManagement(userRights: UserRight[], connection: Connection): UserRight {
    const additional = userRights.filter(prop => prop.property.key === 'receiptManagement.viewAll');
    if (additional?.length === 0) {
      return new UserRight(
        null,
        new Property('receiptManagement.viewAll', 'boolean'),
        false,
        connection,
      );
    }
    return additional.first();
  }

  filterNonUserRights(value: string): boolean {
    return !value.startsWith('notification.');
  }

  filterAdditionalUserRights(value: string): boolean {
    return (
      value !== 'receiptManagement.viewAll' &&
      value !== 'supplierView' &&
      !value.startsWith('notification.')
    );
  }

  getAdditionalFromUserRights(userRights: UserRight[]): UserRight[] {
    return userRights
      .filter(
        userRight =>
          !!userRight.additionalSetting && Object.keys(userRight.additionalSetting).length > 0,
      )
      .map(userRight => userRight.additionalSetting);
  }
}
