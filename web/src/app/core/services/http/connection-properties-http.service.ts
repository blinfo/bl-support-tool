import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';
import { ConnectionProperty } from '../../../shared/interfaces/connection-property';

@Injectable({
  providedIn: 'root'
})
export class ConnectionPropertiesHttpService {
  readonly path = `${environment.apiUrl}connection-properties`;

  constructor(private blAppApiService: ApiHttpService) { }

  create(connectionProperty: ConnectionProperty): Observable<ConnectionProperty> {
    return this.blAppApiService.httpPost<ConnectionProperty>(this.path, connectionProperty);
  }

  update(connectionProperty: ConnectionProperty): Observable<ConnectionProperty> {
    const url = `${this.path}/${connectionProperty.id}`;
    return this.blAppApiService.httpPut<ConnectionProperty>(url, connectionProperty);
  }

  delete(id: number): Observable<void> {
    const url = `${this.path}/${id}`;
    return this.blAppApiService.httpDelete<void>(url);
  }
}
