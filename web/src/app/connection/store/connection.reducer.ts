import * as fromRoot from '../../reducers';
import { Connection } from '../../shared/models/connection';
import { Action, createReducer, on } from '@ngrx/store';
import { clearConnectionState } from './connnection.actions';
import { Page } from '../../shared/interfaces/page';

export const connectionFeatureKey = 'connection';

export interface State extends fromRoot.State {
  connections: Page<Connection[]>;
  error: any;
}

export const initialState: State = {
  connections: undefined,
  error: undefined
};

const connectionReducer = createReducer(
  initialState,
  on(clearConnectionState, () => initialState)
);

export function reducer(state: State, action: Action): any {
  return connectionReducer(state, action);
}

