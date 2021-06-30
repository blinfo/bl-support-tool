import * as fromConnection from './connection.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectConnectionState = createFeatureSelector<fromConnection.State>(fromConnection.connectionFeatureKey);

export const getConnections = createSelector(selectConnectionState, (state) => state.connections);
