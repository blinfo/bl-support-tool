import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';
import { Company } from '@shared/models/company';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { Page } from '@shared/interfaces/page';

@Injectable({
  providedIn: 'root',
})
export class CompanyHttpService {
  readonly path = `${environment.apiUrl}companies`;
  constructor(private blAppApiService: ApiHttpService) {}

  getCompanyByPublicKey(publicKey: string): Observable<Company> {
    const url = `${this.path}/?search=${publicKey}&filter=publicKey`;
    return this.blAppApiService.httpGet<Page<Company>>(url).pipe(
      map(page => page.content.first()),
    );
  }

  getCompanyById(id: string): Observable<Company> {
    const url = `${this.path}/${id}`;
    return this.blAppApiService.httpGet<Company>(url);
  }
}
