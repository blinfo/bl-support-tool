import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { environment } from '@environments/environment';
import { Solution } from '@shared/models/solution';
import { Observable } from 'rxjs';
import { Module } from '@shared/models/module';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SolutionHttpService {
  readonly path = `${environment.apiUrl}solutions`;

  constructor(private apiHttpService: ApiHttpService) {}

  getSolutions(): Observable<Solution[]> {
    return this.apiHttpService.httpGet<Solution[]>(this.path);
  }

  getModules(): Observable<Module[]> {
    return this.apiHttpService.httpGet<Module[]>(this.path + '/modules').pipe(
      map(modules =>
        modules.map(module => {
          if (module.id === 25 || module.id === 26 || module.id === 27) {
            module.paymentType = 2;
          }
          return module;
        }),
      ),
    );
  }
}
