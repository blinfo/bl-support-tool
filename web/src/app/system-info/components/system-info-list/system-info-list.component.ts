import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SystemInfo } from '../../../shared/models/system-info';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { loadMenu } from '../../../shared/store/menu/menu.actions';
import { TEXT } from '../../../shared/text.constants';
import { getSystemInfo } from '../../../shared/store/system-info/system-info.selectors';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalConfiguration } from '../../../shared/interfaces/modal-configuration';
import { ModalComponent } from '../../../shared/entry-components/modal/modal.component';
import { SystemInfoDialogDataService } from '../../services/system-info-dialog-data.service';
import { SystemInfoDialogComponent } from '../system-info-dialog/system-info-dialog.component';
import {
  deleteSystemInfo,
  createSystemInfo,
  updateSystemInfo,
} from '../../../shared/store/system-info/system-info.actions';
import { getRoles } from '../../../shared/store/auth/auth.selectors';
import { Roles } from '../../../shared/enums/roles';

@Component({
  selector: 'app-system-info-list',
  templateUrl: './system-info-list.component.html',
})
export class SystemInfoListComponent implements OnInit, OnDestroy {
  systemInfo$: Observable<SystemInfo[]>;
  formIsValid: boolean;
  subscriptions: Subscription[] = [];
  TEXT = TEXT.systemInfo;
  hasAccess = false;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    private dataService: SystemInfoDialogDataService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.dataService.valid.subscribe((res: boolean) => (this.formIsValid = res)),
    );
    this.setMenu(TEXT.systemInfo.title);
    this.systemInfo$ = this.store.select(getSystemInfo);
    this.checkRoleAccess();
  }

  deleteEntry(entry: SystemInfo): void {
    const dialogConfig: ModalConfiguration<any> = {
      title: TEXT.systemInfo.dialog.deleteTitle,
      data: { id: entry.id },
      component: null,
      confirmButtonText: TEXT.systemInfo.dialog.deleteConfirmButtonText,
      cancelButtonText: TEXT.systemInfo.dialog.cancelButtonText,
    };
    const dialogOptions = { data: dialogConfig };

    const dialogRef = this.dialog.open(ModalComponent, dialogOptions);
    this.subscriptions.push(
      dialogRef.componentInstance.confirmButtonEmitter.subscribe(() => {
        this.store.dispatch(deleteSystemInfo({ id: entry.id }));
        dialogRef.close();
      }),
    );
  }

  createEntry(): void {
    this.dataService.systemInfoEntry = new SystemInfo();
    const dialogConfig: ModalConfiguration<any> = {
      title: TEXT.systemInfo.dialog.createConfirmButtonText,
      data: {},
      component: SystemInfoDialogComponent,
      confirmButtonText: TEXT.systemInfo.dialog.createConfirmButtonText,
      cancelButtonText: TEXT.systemInfo.dialog.cancelButtonText,
    };
    const dialogOptions = { panelClass: 'dialog-container', data: dialogConfig };

    const dialogRef = this.dialog.open(ModalComponent, dialogOptions);
    this.subscriptions.push(
      dialogRef.componentInstance.confirmButtonEmitter.subscribe(() => {
        console.log('formvalid', this.formIsValid);
        if (this.formIsValid) {
          this.store.dispatch(createSystemInfo({ data: this.dataService.systemInfoEntry }));
          dialogRef.close();
        }
      }),
    );
  }

  editEntry(entry: SystemInfo): void {
    this.dataService.systemInfoEntry = entry;
    const dialogConfig: ModalConfiguration<any> = {
      title: TEXT.systemInfo.dialog.editTitle,
      data: {},
      component: SystemInfoDialogComponent,
      confirmButtonText: TEXT.systemInfo.dialog.editConfirmButtonText,
      cancelButtonText: TEXT.systemInfo.dialog.cancelButtonText,
    };
    const dialogOptions: MatDialogConfig = { panelClass: 'dialog-container', data: dialogConfig };

    const dialogRef = this.dialog.open(ModalComponent, dialogOptions);
    this.subscriptions.push(
      dialogRef.componentInstance.confirmButtonEmitter.subscribe(() => {
        if (this.formIsValid) {
          this.store.dispatch(updateSystemInfo({ data: this.dataService.systemInfoEntry }));
          dialogRef.close();
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  checkRoleAccess(): void {
    this.store.select(getRoles).subscribe(roles => {
      this.hasAccess =
        Array.safe(roles).filter(role => role === Roles[Roles.Dev] || role === Roles[Roles.Admin])
          .length > 0;
    });
  }

  private setMenu(title: string): void {
    this.store.dispatch(loadMenu({ title, hidden: false, parentUrl: '' }));
  }
}
