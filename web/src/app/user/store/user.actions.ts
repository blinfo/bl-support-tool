import { createAction, props } from '@ngrx/store';
import { UserSubscription } from '@shared/interfaces/user-subscrption';
import { ConnectionProperty } from '@shared/interfaces/connection-property';
import { Connection } from '@shared/models/connection';
import { UserRight } from '@shared/models/user-right';
import { NotificationProperty } from '@shared/models/notificationProperty';
import { HttpErrorResponse } from '@angular/common/http';
import { Company } from '../../shared/models/company';

export const loadConnections = createAction('[User] Load Connections', props<{ userId: number }>());
export const loadConnectionsSuccess = createAction(
  '[User] Load Connections Success',
  props<{ connections: Connection[] }>(),
);
export const loadConnectionsFailure = createAction(
  '[User] Load Connections Failure',
  props<{ error: any }>(),
);
export const loadCompany = createAction(
  '[User] Load Company',
  props<{
    connection: Connection;
  }>(),
);
export const loadCompanySuccess = createAction(
  '[User] Load Company Success',
  props<{
    company: Company;
  }>(),
);
export const loadCompanyFailure = createAction(
  '[User] Load Company Failure',
  props<{
    error: any;
  }>(),
);
export const loadUserSubscription = createAction(
  '[User] Load User Subscription',
  props<{
    connectionId: number;
  }>(),
);
export const loadUserSubscriptionSuccess = createAction(
  '[User] Load User Subscription Success',
  props<{
    userSubscription: UserSubscription;
  }>(),
);
export const loadUserSubscriptionFailure = createAction(
  '[User] Load User Subscription Failure',
  props<{
    error: any;
  }>(),
);
export const loadConnectionProperties = createAction(
  '[User] Load Connection Properties',
  props<{
    connectionId: number;
  }>(),
);
export const updateConnectionProperties = createAction(
  '[User] Update Connection Properties',
  props<{ connectionProperties: ConnectionProperty[] }>(),
);
export const updateConnectionPropertiesSuccess = createAction(
  '[User] Update Connection Properties Success',
  props<{ connectionProperties: ConnectionProperty[] }>(),
);
export const updateConnectionPropertiesFailure = createAction(
  '[User] Update Connection Properties Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const setUserRights = createAction(
  '[User] Set User Rights',
  props<{
    userRights: UserRight[];
  }>(),
);
export const setNotificationProperties = createAction(
  '[User] set Notification Properties',
  props<{
    notificationProperties: NotificationProperty[];
  }>(),
);
export const loadConnectionPropertiesFailure = createAction(
  '[User] Load Connection Properties Failure',
  props<{
    error: any;
  }>(),
);
export const updateUserRights = createAction(
  '[User] Update User Rights',
  props<{ userRights: UserRight[] }>(),
);
export const updateUserRightsSuccess = createAction(
  '[User] Update User Rights Success',
  props<{ userRights: UserRight[] }>(),
);
export const updateUserRightsFailure = createAction(
  '[User] Update User Rights Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const deleteUserRights = createAction(
  '[User] Delete User Rights',
  props<{ ids: number[] }>(),
);
export const deleteUserRightsSuccess = createAction(
  '[User] Delete User Rights Success',
  props<{ ids: number[] }>(),
);
export const deleteUserRightsFailure = createAction(
  '[User] Delete User Rights Failure',
  props<{ error: HttpErrorResponse }>(),
);
export const clearSelectedConnection = createAction('[User] Clear Selected Connection');
export const clearUserState = createAction('[User] Clear State');
