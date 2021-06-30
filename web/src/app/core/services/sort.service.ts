import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }


  static sort(a: number, b: number): number {
    return a - b;
  }
}
