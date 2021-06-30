import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';
import { BlappUser } from '@shared/models/blapp-user';

@Injectable({
  providedIn: 'root',
})
export class UserHttpService {
  readonly path = `${environment.apiUrl}users`;

  constructor(private blAppApiService: ApiHttpService) {}

  getUser(id: string): Observable<BlappUser> {
    const url = `${this.path}/${id}`;
    return this.blAppApiService.httpGet<BlappUser>(url);
  }

  updateUser(user: BlappUser): Observable<BlappUser>{
    return this.blAppApiService.httpPut<BlappUser>(`${this.path}/${user.id}`,user);
  }
}
