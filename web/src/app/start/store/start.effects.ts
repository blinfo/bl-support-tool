import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadCreatedUsers,
  loadCreatedUsersFailure,
  loadCreatedUsersOfMonth,
  loadCreatedUsersOfMonthFailure,
  loadCreatedUsersOfMonthSuccess,
  loadCreatedUsersSuccess,
  loadUniqueUsersLogin,
  loadUniqueUsersLoginFailure,
  loadUniqueUsersLoginSuccess,
} from './start.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Moment } from 'moment';
import { UserStatisticHttpService } from '@core/services/http/user-statistic-http.service';

@Injectable()
export class StartEffects {
  constructor(private actions$: Actions, private statisticHttpService: UserStatisticHttpService) {}

  loadUniqueUsersLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUniqueUsersLogin),
      mergeMap(({ date }) =>
        this.statisticHttpService.getUniqueLoginsAfter(date).pipe(
          map(userLoginCount => loadUniqueUsersLoginSuccess({ userLoginCount })),
          catchError(error => of(loadUniqueUsersLoginFailure({ error }))),
        ),
      ),
    ),
  );

  loadCreatedUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCreatedUsers),
      mergeMap(({ date }) =>
        this.statisticHttpService.getCountOfCreatedUsersAfter(date).pipe(
          map(usersCreatedCount => loadCreatedUsersSuccess({ usersCreatedCount })),
          catchError(error => of(loadCreatedUsersFailure({ error }))),
        ),
      ),
    ),
  );

  loadCreatedUsersOfMonth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCreatedUsersOfMonth),
      mergeMap(({ date }) =>
        this.statisticHttpService.getCreatedUsersOfSelectedMonth(date).pipe(
          map(value =>
            loadCreatedUsersOfMonthSuccess({ createdUsersOfMonth: this.populateList(value, date) }),
          ),
          catchError(error => of(loadCreatedUsersOfMonthFailure({ error }))),
        ),
      ),
    ),
  );

  private populateList(
    data: { [key: string]: [] },
    date: Moment,
  ): { name: string; value: number }[] {
    return this.getDaysOfMonth(date).map(day => ({
      name: day,
      value: !!data[day] ? data[day].length : 0,
    }));
  }

  private getDaysOfMonth(date: Moment): string[] {
    const daysInMonth = date.daysInMonth();
    let i = 0;

    const days: string[] = [];
    while (i < daysInMonth) {
      i++;
      days.push(date.date(i).format('YYYY-MM-DD'));
    }
    return days;
  }
}
