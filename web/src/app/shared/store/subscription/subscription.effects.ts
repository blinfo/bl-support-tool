import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SolutionHttpService } from '@core/services/http/solution-http.service';
import {
  loadModulesFailure,
  loadModulesSuccess,
  loadSolutions,
  loadSolutionsFailure,
  loadSolutionsSuccess,
} from './subscription.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Solution } from '@shared/models/solution';
import { SortService } from '@core/services/sort.service';

@Injectable()
export class SubscriptionEffects {
  constructor(private actions$: Actions, private solutionHttpService: SolutionHttpService) {}

  @Effect()
  loadSolutions$ = this.actions$.pipe(
    ofType(loadSolutions),
    mergeMap(() =>
      this.solutionHttpService.getSolutions().pipe(
        map(solutions =>
          loadSolutionsSuccess({ solutions: this.addModulesToSolutions(solutions) }),
        ),
        catchError(error => of(loadSolutionsFailure({ error }))),
      ),
    ),
  );

  @Effect()
  loadModules$ = this.actions$.pipe(
    ofType(loadSolutionsSuccess),
    mergeMap(() =>
      this.solutionHttpService.getModules().pipe(
        map(modules => loadModulesSuccess({ modules })),
        catchError(error => of(loadModulesFailure({ error }))),
      ),
    ),
  );

  private addModulesToSolutions(solutions: Solution[]): Solution[] {
    return solutions
      .sort((a, b) => SortService.sort(b.id, a.id))
      .map(solution => {
        solutions.forEach(s => {
          if (solution.id > s.id) {
            solution.modules = solution.modules.concat(s.modules);
          }
        });
        solution.modules.sort((a, b) => SortService.sort(a.id, b.id));
        return solution;
      })
      .reverse();
  }
}
