import * as fromRoot from '../../reducers';
import { Action, createReducer, on } from '@ngrx/store';
import {
  clearSelectedConnection,
  clearUserState,
  deleteUserRightsSuccess,
  loadCompanyFailure,
  loadCompanySuccess,
  loadConnectionPropertiesFailure,
  loadConnectionsFailure,
  loadConnectionsSuccess,
  loadUserSubscriptionFailure,
  loadUserSubscriptionSuccess,
  setNotificationProperties,
  setUserRights,
  updateUserRightsSuccess,
} from './user.actions';
import { UserSubscription } from '@shared/interfaces/user-subscrption';
import { Connection } from '@shared/models/connection';
import { UserRight } from '@shared/models/user-right';
import { NotificationProperty } from '@shared/models/notificationProperty';
import { Company } from '../../shared/models/company';

export const userFeatureKey = 'user';

export interface State extends fromRoot.State {
  connections: Connection[];
  error: any;
  company: Company;
  userSubscription: UserSubscription;
  userRights: UserRight[];
  notificationProperties: NotificationProperty[];
}

export const initialState: State = {
  connections: [],
  error: undefined,
  company: undefined,
  userSubscription: undefined,
  userRights: [],
  notificationProperties: [],
};

const userReducer = createReducer(
  initialState,
  on(loadConnectionsSuccess, (state, action) => ({
    ...state,
    connections: action.connections,
  })),
  on(loadCompanySuccess, (state, action) => ({
    ...state,
    company: action.company,
  })),
  on(loadUserSubscriptionSuccess, (state, action) => ({
    ...state,
    userSubscription: action.userSubscription,
  })),
  on(setUserRights, (state, action) => ({
    ...state,
    userRights: action.userRights,
  })),
  on(setNotificationProperties, (state, action) => ({
    ...state,
    notificationProperties: action.notificationProperties,
  })),
  on(
    loadConnectionsFailure,
    loadCompanyFailure,
    loadUserSubscriptionFailure,
    loadConnectionPropertiesFailure,
    (state, action) => ({
      ...state,
      error: action.error,
    }),
  ),
  on(updateUserRightsSuccess, (state, action) => ({
    ...state,
    userRights: updateUserRights(state.userRights, action.userRights).concat(addNewUserRights(state.userRights, action.userRights)),
  })),
  on(deleteUserRightsSuccess, (state, action) => ({
    ...state,
    userRights: deleteUserRights(state.userRights, action.ids),
  })),
  on(clearSelectedConnection, (state, action) => ({
    ...state,
    userRights: initialState.userRights,
    company: initialState.company,
    userSubscription: initialState.userSubscription,
  })),
  on(clearUserState, () => initialState),
);

const addNewUserRights = (userRights: UserRight[], newUserRights: UserRight[]) => {
  return newUserRights.filter(userRight => !userRights.find(u => u.id === userRight.id));
};

const updateUserRights = (userRights: UserRight[], updatedUserRights: UserRight[]) => {
  return userRights.map(userRight => {
    const newRow = updatedUserRights.find(u => userRight.id === u.id);
    if (newRow) {
      return { ...newRow };
    }
    return userRight;
  });
};

const deleteUserRights = (userRights: UserRight[], ids: number[]) => {
  return userRights.filter(userRight => !ids.find(id => userRight.id === id));
};

export function reducer(state: State, action: Action): any {
  return userReducer(state, action);
}
