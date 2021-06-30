import { Component, OnInit, OnDestroy } from '@angular/core';
import { SystemInfoHttpService } from '@app/core/services/http/system-info-http.service';
import { State } from '@app/reducers';
import { Store } from '@ngrx/store';
import { clearSystemInfoState } from '@app/shared/store/system-info/system-info.actions';

@Component({
  templateUrl: './system-info.component.html',
})
export class SystemInfoComponent implements OnInit, OnDestroy {
  constructor(private systemInfo: SystemInfoHttpService, private store: Store<State>) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearSystemInfoState());
  }
}
