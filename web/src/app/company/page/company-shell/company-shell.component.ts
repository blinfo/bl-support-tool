import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { clearTableState } from '@shared/store/table/table.actions';

@Component({
  template: '<router-outlet></router-outlet>',
})
export class CompanyShellComponent implements OnDestroy {
  constructor(private store: Store<State>) {}

  ngOnDestroy(): void {
    this.store.dispatch(clearTableState());
  }
}
