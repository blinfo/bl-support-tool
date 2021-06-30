import { Property } from './property';
import { Connection } from './connection';
import { ConnectionProperty } from '../interfaces/connection-property';

export class NotificationProperty {
  id: number;
  property: Property;
  value: boolean;
  connection: Connection;

  constructor(id: number, property: Property, value: boolean, connection: Connection) {
    this.id = id;
    this.property = property;
    this.value = value;
    this.connection = connection;
  }

  static propertyToNotification(connectionProperty: ConnectionProperty): NotificationProperty {
    return new NotificationProperty(
      connectionProperty.id,
      connectionProperty.property,
      JSON.parse(connectionProperty.value),
      connectionProperty.connection,
    );
  }
}
