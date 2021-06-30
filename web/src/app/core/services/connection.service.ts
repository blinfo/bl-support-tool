import { Injectable } from '@angular/core';
import { Connection } from '@shared/models/connection';
import { DropdownItem } from '@shared/models/dropdown-item';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor() {}

  getAsDropdownItems(connections: Connection[]): DropdownItem[] {
    return Array.safe(connections).map(connection => {
      return {
        title: `${connection.publicKey}${
          connection.companyName ? ' - ' + connection.companyName : ''
        }`,
        value: connection,
        readOnly: false,
        compareValue: connection.id,
      };
    });
  }
}
