import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';
import { SkvConnection } from '@shared/interfaces/skv-connection';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkvHttpService {
  readonly path = `${environment.apiUrl}bla-api/skv`;

  constructor(private blAppApiService: ApiHttpService) { }

  getConnection(publicKey: string): Observable<SkvConnection> {
    const options = {
      headers: new HttpHeaders({
        publicKey
      })
    };
    return this.blAppApiService.httpGet<SkvConnection>(this.path, options);
}
}
