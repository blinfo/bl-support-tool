import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TEXT } from '@shared/text.constants';
import { BlappUser } from '@shared/models/blapp-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isValidSSN } from '@app/user/validators/ssn-validator';
import { Observable } from 'rxjs';
import { State } from '../../../reducers';
import { Store } from '@ngrx/store';
import { getRoles } from '../../../shared/store/auth/auth.selectors';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit, OnChanges {
  @Input() user: BlappUser;
  @Output() userEvent: EventEmitter<BlappUser> = new EventEmitter<BlappUser>();

  hasEditRights$: Observable<boolean>;
  editMode: boolean;
  userForm: FormGroup;
  cancelText = TEXT.cancelText;
  saveText = TEXT.saveText;

  constructor(private fb: FormBuilder, private store: Store<State>) {}

  ngOnInit(): void {
    this.hasEditRights$ = this.store.select(getRoles).pipe(
      filter(roles => !!roles && roles.length > 0),
      map(roles => !!roles.find(role => role === 'Dev' || role === 'Admin')),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.userForm) {
      this.initForm();
    }
    if (changes.user?.currentValue) {
      this.setValues();
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      socialSecurityNumber: [{ value: '', disabled: true }, [Validators.required, isValidSSN]],
      id: { value: '', disabled: true },
      createdAt: { value: '', disabled: true },
      lastLogin: { value: '', disabled: true },
      profilePictureUrl: { value: '', disabled: true },
      blAllInclusive: { value: '', disabled: true },
    });
  }

  submit(): void {
    this.editMode = false;
    this.enableOrDisableInputs();
    this.userForm.patchValue({
      socialSecurityNumber: this.userForm.get('socialSecurityNumber').value.replace('-', ''),
    });
    this.userEvent.emit(this.userForm.value);
  }

  cancel(): void {
    this.editMode = false;
    this.setValues();
    this.enableOrDisableInputs();
  }

  private setValues(): void {
    this.userForm.patchValue(this.user);
  }

  edit(): void {
    this.editMode = !this.editMode;
    this.enableOrDisableInputs();
    this.userForm.markAsPristine();
  }

  enableOrDisableInputs(): void {
    this.editMode ? this.userForm.get('name').enable() : this.userForm.get('name').disable();
    this.editMode
      ? this.userForm.get('socialSecurityNumber').enable()
      : this.userForm.get('socialSecurityNumber').disable();
  }
}
