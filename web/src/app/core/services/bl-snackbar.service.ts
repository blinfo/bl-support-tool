import { Injectable } from '@angular/core';
import { MessageType, SnackbarMessage } from '@shared/interfaces/snackbar-message';

@Injectable({
  providedIn: 'root',
})
export class BlSnackbarService {
  private defaultDuration = 3000;
  private snackbarType = MessageType.SUCCESS;
  private dismissable = true;
  private snackbarArray: SnackbarMessage[] = [];

  show(snackbarItem: SnackbarMessage): void {
    snackbarItem.visible = true;
    snackbarItem.duration = snackbarItem.duration ? snackbarItem.duration : this.defaultDuration;
    snackbarItem.type = snackbarItem.type ? snackbarItem.type : this.snackbarType;
    snackbarItem.dismissable =
      snackbarItem.dismissable !== undefined ? snackbarItem.dismissable : this.dismissable;

    this.snackbarArray.push(snackbarItem);

    setTimeout(() => {
      snackbarItem.visible = false;
      this.removeInvisibleSnackbars(1000);
    }, snackbarItem.duration || this.defaultDuration);
  }

  getSnackbarArray(): SnackbarMessage[] {
    return this.snackbarArray;
  }

  removeInvisibleSnackbars(duration = 0): void {
    setTimeout(() => {
      this.snackbarArray = this.snackbarArray.filter(
        (snackbarItem) => snackbarItem.visible === true,
      );
    }, duration);
  }
}
