import { Injectable } from '@angular/core';
import { SystemInfo } from '@app/shared/models/system-info';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SystemInfoDialogDataService {
  public valid = new Subject();

  private _systemInfoEntry: SystemInfo;
  set systemInfoEntry(entry: SystemInfo) {
    this._systemInfoEntry = entry;
  }
  get systemInfoEntry(): SystemInfo {
    return this._systemInfoEntry;
  }
  constructor() {}

  public formIsValid(valid: boolean): void {
    this.valid.next(valid);
  }
}
