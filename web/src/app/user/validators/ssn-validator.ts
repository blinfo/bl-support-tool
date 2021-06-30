import {AbstractControl} from "@angular/forms";
import * as moment from "moment";

export function isValidSSN(control: AbstractControl): { [key: string]: boolean } | null  {
  if (!control.value) {
    return null;
  }
  let ssn = control.value;

  if (ssn) {
    ssn = ssn.replace(/[\D]/gm, '');
  }
  if (ssn.length !== 12) {
    return { validSSN: false };
  }
  const numbers = ssn.match(/^(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)(\d)$/) || [];
  let checkSum = 0;
  for (let i = 3; i <= numbers.length; i++) {
    const n = parseInt(numbers[i], 10) || 0;
    if (i % 2 === 0) {
      checkSum += n;
    } else {
      checkSum += ((n * 2) % 9) + Math.floor(n / 9) * 9;
    }
  }
  if (checkSum % 10 === 0 && moment(ssn.slice(0, 8), 'YYYYMMDD', true).isValid()) {
    return null;
  }
  return { validPin: false };
}
