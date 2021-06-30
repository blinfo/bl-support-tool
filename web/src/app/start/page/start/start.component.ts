import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import {
  getCountCreatedUserOfMonth,
  getCreatedUserOfMonth,
  getUniqueUserLogins,
  getUsersCreated,
} from '../../store/start.selectors';
import {
  loadCreatedUsers,
  loadCreatedUsersOfMonth,
  loadUniqueUsersLogin,
} from '../../store/start.actions';
import * as moment from 'moment';
import { filter, map, take, tap } from 'rxjs/operators';
import { getUser } from '@shared/store/auth/auth.selectors';
import { MsalUser } from '@shared/models/msal-user';
import { ChartData } from '@shared/interfaces/chart-data';
import { Moment } from 'moment';
import { loadMenu } from '@shared/store/menu/menu.actions';
import { TEXT } from '@shared/text.constants';

@Component({
  templateUrl: './start.component.html',
})
export class StartComponent implements OnInit {
  user$: Observable<MsalUser>;
  loginCount$: Observable<number>;
  createdCount$: Observable<number>;
  createdCountOfMonth$: Observable<number>;
  chartNewUsersData$: Observable<ChartData>;

  chartLabels: string[] = [];
  month: string;
  year: number;
  selectedMonth: Moment;
  colorScheme = {
    domain: ['#58a3be' + ''],
  };

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(loadMenu({ title: TEXT.start, hidden: false, parentUrl: '' }));
    this.loginCount$ = this.store.select(getUniqueUserLogins);
    this.createdCount$ = this.store.select(getUsersCreated);
    this.createdCountOfMonth$ = this.store.select(getCountCreatedUserOfMonth);
    this.user$ = this.store.select(getUser).pipe(
      filter(u => !!u),
      take(1),
      tap(() => {
        this.store.dispatch(loadUniqueUsersLogin({ date: moment() }));
        this.store.dispatch(loadCreatedUsers({ date: moment() }));
        this.setMonth(moment());
      }),
    );
    this.chartNewUsersData$ = this.store
      .select(getCreatedUserOfMonth)
      .pipe(map(data => this.getChartData(data)));
  }

  private getChartData(data: { name: string; value: number }[]): ChartData {
    return {
      results: data,
      xAxisLabel: 'Datum',
      yAxisLabel: 'Antal',
      showLegend: false,
      legendTitle: '',
      showGradient: true,
      showXAxis: true,
      showXAxisLabel: false,
      showYAxis: true,
      showYAxisLabel: true,
    };
  }

  setMonth(month: Moment): void {
    this.selectedMonth = moment(month);
    this.month = this.selectedMonth.locale('sv').format('MMMM');
    this.year = this.selectedMonth.year();
    this.store.dispatch(loadCreatedUsersOfMonth({ date: this.selectedMonth }));
  }

  isCurrentMonth(): boolean {
    return this.selectedMonth.isSame(moment(), 'month');
  }
}
