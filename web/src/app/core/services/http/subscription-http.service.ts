import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSubscription } from '@shared/interfaces/user-subscrption';
import { environment } from '@environments/environment';
import { ApiHttpService } from './api-http.service';
import { SubscriptionStats } from '@shared/interfaces/subscription-stats';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionHttpService {
  readonly path = `${environment.apiUrl}subscriptions`;
  constructor(private blAppApiService: ApiHttpService) {}

  getByConnectionId(id: number): Observable<UserSubscription> {
    const url = `${this.path}/connection/${id}`;
    return this.blAppApiService.httpGet<UserSubscription>(url);
  }

  getCompanySubscriptionByPublicKey(publicKey: string): Observable<SubscriptionStats> {
    const url = `${this.path}/company/stats/${publicKey}`;
    return this.blAppApiService.httpGet<SubscriptionStats>(url);
  }
}
