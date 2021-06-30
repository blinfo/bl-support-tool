import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyCreatorService {
  dataSafeUrl = 'https://apireg.blinfo.se/data-safe/deposit/time/6000000';

  constructor(private http: HttpClient) {}

  encode(userId: string, publicKey: string, source: string): string {
    const key = {
      userId,
      publicKey,
      source,
    };
    let encoded = btoa(JSON.stringify(key));
    encoded = btoa(encoded);
    return btoa(encoded);
  }

  postToDataSafe(body: string): Observable<string> {
    return this.http.post<string>(this.dataSafeUrl, body);
  }
}
