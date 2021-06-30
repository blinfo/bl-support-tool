import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUserRightComponent } from '../components/add-user-right/add-user-right.component';
import { FormArray, FormGroup } from '@angular/forms';
import { UserRight } from '../../shared/models/user-right';
import { Observable } from 'rxjs';
import { Property } from '../../shared/models/property';
import { State } from '../../reducers';
import { Store } from '@ngrx/store';
import { deleteUserRights, updateUserRights } from '../store/user.actions';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  userRightForm: FormGroup;

  get userRights(): FormArray {
    return this.userRightForm.get('userRights') as FormArray;
  }

  constructor(private dialog: MatDialog, private store: Store<State>) {}

  save(updatedUserRights: UserRight[], userRights: UserRight[]): void {
    console.log({ updatedUserRights, userRights });
    this.createOrUpdateUserRights(
      updatedUserRights.filter(
        userRight =>
          !userRights.find(u => UserRight.isEqual(userRight, u)),
      ),
    );
    this.removeUserRights(
      userRights.filter(
        userRight =>
          !updatedUserRights.find(
            u => userRight.id === u.id || userRight.property.key === u.property.key,
          ),
      ),
    );
  }

  openUserRightPopup(properties: UserRight[]): Observable<Property> {
    return this.dialog
      .open(AddUserRightComponent, this.getMatDialogConfig(properties))
      .afterClosed();
  }

  private getMatDialogConfig(properties: UserRight[]): MatDialogConfig {
    return {
      panelClass: 'dialog-container',
      data: properties,
    };
  }

  createOrUpdateUserRights(userRights: UserRight[]): void {
    if (userRights?.length > 0) {
      this.store.dispatch(updateUserRights({ userRights }));
    }
  }

  removeUserRights(userRights: UserRight[]): void {
    if (userRights?.length > 0) {
      this.store.dispatch(deleteUserRights({ ids: userRights.map(userRight => userRight.id) }));
    }
  }
}
