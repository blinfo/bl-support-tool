import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SystemInfoState } from './system-info.state';
import * as fromSystemInfo from './system-info.reducer';

const selectSystemInfoState = createFeatureSelector<SystemInfoState>(
  fromSystemInfo.systemInfoFeatureKey,
);

export const getSystemInfo = createSelector(selectSystemInfoState, state => state.systemInfo);
