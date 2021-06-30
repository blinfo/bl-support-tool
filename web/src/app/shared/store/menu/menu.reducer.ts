import { Action, createReducer, on } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { clearMenuState, loadMenu } from '@shared/store/menu/menu.actions';

export const menuFeatureKey = 'menu';

export interface State extends fromRoot.State {
  title: string;
  hidden: boolean;
  parentUrl: string;
}

export const initialState: State = {
  title: undefined,
  hidden: undefined,
  parentUrl: undefined,
};

const menuReducer = createReducer(
  initialState,
  on(loadMenu, (state, action) => ({
    ...state,
    title: action.title,
    hidden: action.hidden,
    parentUrl: action.parentUrl,
  })),
  on(clearMenuState, () => initialState),
);

export function reducer(state: State, action: Action): any {
  return menuReducer(state, action);
}
