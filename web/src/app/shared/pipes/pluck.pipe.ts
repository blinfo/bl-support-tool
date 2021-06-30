import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluck',
})
export class PluckPipe implements PipeTransform {
  transform(input: any[], key: string): string[] {
    return input.map(value => value[key]);
  }
}
