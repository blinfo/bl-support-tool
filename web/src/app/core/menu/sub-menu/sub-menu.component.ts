import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { getMenu } from '@shared/store/menu/menu.selectors';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html'
})
export class SubMenuComponent implements OnInit {
  menu$: Observable<{ title: string, hidden: boolean, parentUrl: string}>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.menu$ = this.store.select(getMenu);
  }

}
