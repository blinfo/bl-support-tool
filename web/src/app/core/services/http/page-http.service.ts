import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';
import { PageRequest } from '@shared/models/page-request';
import { environment } from '@environments/environment';
import { Page } from '@shared/interfaces/page';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageHttpService {
  constructor(private httpService: ApiHttpService) {
  }

  getPage(page: PageRequest): Observable<Page<any>> {
    const url = `${environment.apiUrl}${page.apiKey}?page=${page.pageNumber - 1}&size=${page.size}${
      page.requestData ? '&search=' + page.requestData : ''
    }&sortKey=${page.sort?.key ?? ''}&sortDir=${page.sort?.direction ?? ''}`;
    return this.httpService.httpGet<Page<any>>(url).pipe(
      map((data) => {
        data.requestedSort = page.sort;
        return data;
      })
    );
  }
}
