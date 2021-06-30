import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';
import { Property } from '../../../shared/models/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyHttpService {
  readonly path = `${environment.apiUrl}properties`;

  constructor(private blAppApiService: ApiHttpService) {}

  getAll(): Observable<Property[]> {
    return this.blAppApiService.httpGet<Property[]>(this.path);
  }
}
