import { Property } from './property';
import { Connection } from './connection';
import { ConnectionProperty } from '../interfaces/connection-property';

export class UserRight {
  id: number;
  property: Property;
  value: boolean;
  connection: Connection;
  additionalSetting: UserRight = null;

  constructor(id: number, property: Property, value: boolean, connection: Connection, additionalSetting?: UserRight) {
    this.id = id;
    this.property = property;
    this.value = value;
    this.connection = connection;

    if (additionalSetting) {
      this.additionalSetting = additionalSetting;
    }
  }

  static propertyToUserRight(connectionProperty: ConnectionProperty): UserRight {
    return new UserRight(
      connectionProperty.id,
      connectionProperty.property,
      JSON.parse(connectionProperty.value),
      connectionProperty.connection,
    );
  }

  static toConnectionProperty(userRight: UserRight): ConnectionProperty {
    return new ConnectionProperty(
      userRight.id,
      userRight.property,
      JSON.stringify(userRight.value),
      userRight.connection
    );
  }

  static isEqual(a: UserRight, b: UserRight): boolean {
    if (a.id !== b.id && a.property.key !== b.property.key) {
      return false;
    }
    return a.value === b.value;
  }
}
