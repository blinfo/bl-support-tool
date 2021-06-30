import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserStatisticHttpService {
  private path = 'statistic/';

  constructor(private blAppAdminApiService: ApiHttpService) {}

  getUniqueLoginsAfter(date: Moment): Observable<number> {
    const url = `${environment.apiUrl + this.path}count/logins?days=${date.toISOString()}`;
    return this.blAppAdminApiService.httpGet<number>(url);
  }

  getCountOfCreatedUsersAfter(date: Moment): Observable<number> {
    const url = `${environment.apiUrl + this.path}count/created?days=${date.toISOString()}`;
    return this.blAppAdminApiService.httpGet<number>(url);
  }

  getCreatedUsersOfSelectedMonth(date: Moment): Observable<{[key: string]: []}> {
    const url = `${environment.apiUrl + this.path}created/month?date=${date.toISOString()}`;
    return this.blAppAdminApiService.httpGet<{[key: string]: []}>(url);
  }
}
