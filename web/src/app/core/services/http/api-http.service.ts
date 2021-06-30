import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {

  constructor(private httpClient: HttpClient) {
  }

  httpGet<T>(url, optionalHttpOptions?: object): Observable<T> {
    return this.httpClient.get<T>(url, optionalHttpOptions);
  }

  httpPost<T>(url: string, body: any, optionalHttpOptions?: object): Observable<T> {
    return this.httpClient.post<T>(url, body, optionalHttpOptions);
  }

  httpPut<T>(url: string, body: any, optionalHttpOptions?: object): Observable<T> {
    return this.httpClient.put<T>(url, body, optionalHttpOptions);
  }

  httpPatch<T>(url: string, body: any, optionalHttpOptions?: object): Observable<T> {
    return this.httpClient.patch<T>(url, body, optionalHttpOptions);
  }

  httpDelete<T>(url: string, optionalHttpOptions?: object): Observable<T> {
    return this.httpClient.delete<T>(url, optionalHttpOptions);
  }
}
