import {
  Component,
  ComponentFactoryResolver,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalConfiguration } from '@shared/interfaces/modal-configuration';
import { LocationStrategy } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @ViewChild('dialogContainer', { read: ViewContainerRef, static: true })
  dialogContainer: ViewContainerRef;
  public confirmButtonEmitter = new Subject();
  public cancelButtonEmitter = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalConfiguration<any>,
    private dialogRef: MatDialogRef<ModalComponent>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private locationStrategy: LocationStrategy,
  ) {}

  ngOnInit(): void {
    if (!this.data) {
      this.close();
      return;
    }
    this.closeOnBackHandler();
    this.setComponent();
  }

  private setComponent(): void {
    this.dialogContainer.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
    this.dialogContainer.createComponent(factory);
  }

  close(data?: any): void {
    this.dialogRef.close(data);
  }

  onConfirmButtonClick(event) {
    this.confirmButtonEmitter.next(event);
  }

  onCancelButtonClick(event) {
    this.cancelButtonEmitter.next(event);
    this.close();
  }

  closeOnBackHandler(): void {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      this.close();
    });
  }
}
