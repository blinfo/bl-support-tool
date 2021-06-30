import { Injectable } from '@angular/core';
import { ConnectionProperty } from '@shared/interfaces/connection-property';
import { UserRight } from '@shared/models/user-right';
import { NotificationProperty } from '@shared/models/notificationProperty';

@Injectable({
  providedIn: 'root',
})
export class ConnectionPropertyService {
  constructor() {}

  toUserRights(connectionProperties: ConnectionProperty[]): UserRight[] {
    return connectionProperties
      .filter(prop => this.filterNonUserRights(prop.property.key))
      .map(prop => {
        const userRight = UserRight.propertyToUserRight(prop);
        if (prop.property.key === 'attest') {
          userRight.additionalSetting = this.getChildrenOfAttest(connectionProperties);
        }
        if (prop.property.key === 'receiptManagement') {
          userRight.additionalSetting = this.getChildrenOfReceiptManagement(connectionProperties);
        }
        return userRight;
      });
  }

  getNotificationFromConnectionProperties(
    connectionProperties: ConnectionProperty[],
  ): NotificationProperty[] {
    return connectionProperties
      .filter(prop => prop.property.key.startsWith('notification.'))
      .map(prop => NotificationProperty.propertyToNotification(prop));
  }

  getChildrenOfAttest(connectionProperties: ConnectionProperty[]): UserRight {
    return connectionProperties
      .filter(prop => prop.property.key === 'supplierView')
      .map(prop => UserRight.propertyToUserRight(prop))
      .first();
  }

  getChildrenOfReceiptManagement(connectionProperties: ConnectionProperty[]): UserRight {
    return connectionProperties
      .filter(prop => prop.property.key === 'receiptManagement.viewAll')
      .map(prop => UserRight.propertyToUserRight(prop))
      .first();
  }

  filterNonUserRights(value: string): boolean {
    return (
      value !== 'receiptManagement.viewAll' &&
      value !== 'supplierView' &&
      !value.startsWith('notification.')
    );
  }
}
