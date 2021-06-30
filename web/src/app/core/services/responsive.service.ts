import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {

  constructor() {}
  screenSize = new BehaviorSubject(window.innerWidth);

  setScreenSize(value): void {
    this.screenSize.next(value);
  }
  getScreenSize(): Observable<number> {
    return this.screenSize.asObservable();
  }
}
