import { Injectable } from '@angular/core';
import { ApiHttpService } from '@core/services/http/api-http.service';
import { Observable } from 'rxjs';
import { BankStatus } from '@shared/interfaces/bank-status';
import { environment } from '@environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BankHttpService {
  readonly path = `${environment.apiUrl}bla-api/pay`;
  constructor(private blAppApiService: ApiHttpService) {}

  getStatus(publicKey: string): Observable<BankStatus> {
    const url = `${this.path}/status?publicKey=${publicKey}`;
    const options = {
      headers: new HttpHeaders({
        publicKey
      })
    };
    return this.blAppApiService.httpGet<BankStatus>(url, options);
  }
}
