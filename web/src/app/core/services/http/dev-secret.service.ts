import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevSecretService {
  readonly path = `${environment.apiUrl}dev-secret`;
  constructor(private blAppApiService: ApiHttpService) {}

  getSimpleCredentials(publicKey: string): Observable<string> {
    return this.blAppApiService.httpGet<string>(`${this.path}?publicKey=${publicKey}`);
  }
}
