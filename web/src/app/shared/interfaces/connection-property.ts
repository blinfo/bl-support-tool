import { Property } from '../models/property';
import { Connection } from '../models/connection';

export class ConnectionProperty {
  id: number;
  property: Property;
  value: string;
  connection: Connection;


  constructor(id: number, property: Property, value: string, connection: Connection) {
    this.id = id;
    this.property = property;
    this.value = value;
    this.connection = connection;
  }
}
