import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';
import { SystemInfo } from '@app/shared/models/system-info';

@Injectable({
  providedIn: 'root',
})
export class SystemInfoHttpService {
  readonly path = `${environment.apiUrl}system-info`;

  constructor(private blAppApiService: ApiHttpService) {}

  getSystemInfo(): Observable<SystemInfo[]> {
    return this.blAppApiService.httpGet<SystemInfo[]>(this.path);
  }

  updateSystemInfo(data: SystemInfo): Observable<SystemInfo> {
    return this.blAppApiService.httpPut<SystemInfo>(`${this.path}/${data.id}`, data);
  }

  createSystemInfo(data: SystemInfo): Observable<SystemInfo> {
    return this.blAppApiService.httpPost<SystemInfo>(`${this.path}`, data);
  }

  deleteSystemInfo(id: number): Observable<any> {
    return this.blAppApiService.httpDelete(`${this.path}/${id}`);
  }
}
