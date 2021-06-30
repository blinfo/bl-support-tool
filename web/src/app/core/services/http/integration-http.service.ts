import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';
import { Integration } from '@shared/models/integration';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntegrationHttpService {
  resource = `${environment.apiUrl}integrations`;

  constructor(private blAppApiService: ApiHttpService) { }

  getIntegrations(companyId: number): Observable<Integration[]> {
    const url = `${this.resource}?companyId=${companyId}`;
    return this.blAppApiService.httpGet<Integration[]>(url);
  }
}
