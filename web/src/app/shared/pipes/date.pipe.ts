import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import * as moment from 'moment';

@Pipe({ name: 'date' })
export class DatePipe extends DecimalPipe implements PipeTransform {
  transform(date: string): any {
    return moment(date).isValid() ? moment(date).locale('sv').format('LL HH:mm:ss') : '';
  }
}
