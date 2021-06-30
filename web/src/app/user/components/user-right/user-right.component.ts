import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { BlSnackbarService } from '@core/services/bl-snackbar.service';
import { UserDetailsService } from '@app/user/services/user-details.service';
import { getUserRights } from '@app/user/store/user.selectors';
import { Observable, Subscription } from 'rxjs';
import { UserRight } from '@shared/models/user-right';
import { FieldConfig } from '../../../shared/interfaces/field-config';
import * as userDetailsConfig from '../../config/user-details.config';
import { UserRightService } from '../../../core/services/user-right.service';
import { Connection } from '../../../shared/models/connection';
import { getRoles } from '../../../shared/store/auth/auth.selectors';
import { filter, map } from 'rxjs/operators';
import { Property } from '../../../shared/models/property';

@Component({
  selector: 'app-user-right',
  templateUrl: './user-right.component.html',
})
export class UserRightComponent implements OnInit, OnDestroy {
  properties: UserRight[];
  selectedUserRights: UserRight[];
  userRightForm: FormGroup;
  isEditMode = false;
  isAddNewMode = false;
  @Input() hasRoleAccess = false;
  @Input() connection: Connection;
  subscriptions: Subscription[] = [];
  supplierView = false;
  hasEditRights$: Observable<boolean>;

  attestFieldConfig: FieldConfig[] = userDetailsConfig.attestFieldConfig;
  receiptManagementFieldConfig: FieldConfig[] = userDetailsConfig.receiptManagementFieldConfig;

  get userRights(): FormArray {
    return this.userRightForm.get('userRights') as FormArray;
  }

  constructor(
    private store: Store<State>,
    private snackbarService: BlSnackbarService,
    private fb: FormBuilder,
    private userDetailsService: UserDetailsService,
    private userRightService: UserRightService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscriptions.push(this.userRightsChangeListener());
    this.hasEditRights$ = this.store.select(getRoles).pipe(
      filter(roles => !!roles && roles.length > 0),
      map(roles => !!roles.find(role => role === 'Dev' || role === 'Admin')),
    );

    this.userRights.valueChanges.subscribe(userRights => {
      this.selectedUserRights = userRights;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private initForm(): void {
    this.userRightForm = this.fb.group({
      userRights: this.fb.array([]),
    });
  }

  private userRightsChangeListener(): Subscription {
    return this.store.select(getUserRights).subscribe(properties => {
      this.properties = properties;
      this.userRights.clear();
      this.userRights.updateValueAndValidity();
      this.userRightService
        .setAdditionalSetting(this.properties)
        .forEach(userRight => this.userRights.push(this.buildProperty(userRight)));
    });
  }

  private buildProperty(userRight: UserRight): FormGroup {
    return this.fb.group({
      id: userRight.id,
      property: userRight.property,
      value: userRight.value,
      connection: userRight.connection,
      additionalSetting: userRight.additionalSetting
        ? this.fb.group(userRight.additionalSetting)
        : this.fb.group({}),
    });
  }

  removeProperty(index: number): void {
    this.userRights.removeAt(index);
    this.userRights.updateValueAndValidity();
    this.userRightForm.markAsDirty();
  }

  addNewMode(): void {
    this.isAddNewMode = !this.isAddNewMode;
  }

  addNewUserRight(property: Property): void {
    this.userRights.push(
      this.buildProperty(
        new UserRight(null, property, true, this.connection, this.getAdditionalUserRight(property)),
      ),
    );
    this.userRightForm.markAsDirty();
  }

  getAdditionalUserRight(property: Property): UserRight {
    if (property.key === 'attest') {
      return new UserRight(null, new Property('supplierView', 'boolean'), false, this.connection);
    }
    if (property.key === 'receiptManagement') {
      return new UserRight(
        null,
        new Property('receiptManagement.viewAll', 'boolean'),
        false,
        this.connection,
      );
    }
    return null;
  }

  save(form: FormGroup): void {
    this.userDetailsService.save(
      form
        .get('userRights')
        .value.concat(
          this.userRightService.getAdditionalFromUserRights(form.get('userRights').value),
        ),
      this.properties,
    );
    this.isEditMode = false;
  }

  cancel(): void {
    this.isEditMode = false;
    this.userRights.clear();
    this.userRights.updateValueAndValidity();
    this.userRightService
      .setAdditionalSetting(this.properties)
      .forEach(userRight => this.userRights.push(this.buildProperty(userRight)));
  }

  editMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  setSupplierView(value): void {
    this.supplierView = value;
  }
}
