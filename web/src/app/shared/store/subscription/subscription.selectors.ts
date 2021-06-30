import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSubscription from './subscription.reducer';

const selectSubscriptionState = createFeatureSelector<fromSubscription.State>(fromSubscription.subscriptionFeatureKey);

export const getSolutions = createSelector(selectSubscriptionState, state => state.solutions);

export const getModules = createSelector(selectSubscriptionState, state => state.modules);
