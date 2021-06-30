import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';
import { Connection } from '@shared/models/connection';
import { environment } from '@environments/environment';
import { ConnectionProperty } from '@shared/interfaces/connection-property';

@Injectable({
  providedIn: 'root',
})
export class ConnectionHttpService {
  readonly path = `${environment.apiUrl}connections`;
  constructor(private blAppApiService: ApiHttpService) {}

  getPropertiesByConnectionId(connectionId: number): Observable<ConnectionProperty[]> {
    const url = `${this.path}/properties/${connectionId}`;
    return this.blAppApiService.httpGet<ConnectionProperty[]>(url);
  }

  getConnectionsByUserId(userId: number): Observable<Connection[]> {
    const url = `${this.path}/user?id=${userId}`;
    return this.blAppApiService.httpGet<Connection[]>(url);
  }
}
