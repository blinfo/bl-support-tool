import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMenu from './menu.reducer';

const selectMenuState = createFeatureSelector<fromMenu.State>(fromMenu.menuFeatureKey);

export const getMenu = createSelector(selectMenuState, state => state);
