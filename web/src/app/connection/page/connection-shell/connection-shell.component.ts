import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { clearTableState } from '../../../shared/store/table/table.actions';

@Component({
  template: '<router-outlet></router-outlet>',
})
export class ConnectionShellComponent implements OnDestroy {
  constructor(private store: Store<State>) {}

  ngOnDestroy(): void {
    this.store.dispatch(clearTableState());
  }
}
