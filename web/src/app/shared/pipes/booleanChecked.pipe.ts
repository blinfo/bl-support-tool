import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanChecked',
})
export class BooleanCheckedPipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (typeof value === 'boolean' || (typeof value === 'number' && (value === 1 || value === 0))) {
      return value
        ? `<i class="fal fa-check text-base text-bl-green-500"></i>`
        : `<i class="fal fa-times text-base text-bl-red-500"></i>`;
    }
    return `<span>${value ? value : ''}</span>`;
  }
}
