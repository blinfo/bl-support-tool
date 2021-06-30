import { Component, OnInit, OnDestroy } from '@angular/core';
import { transition, state, trigger, animate, style } from '@angular/animations';
import { Subscription } from 'rxjs';
import { BlSnackbarService } from '../services/bl-snackbar.service';
import { SnackbarMessage } from '@shared/interfaces/snackbar-message';
import { ResponsiveService } from '../services/responsive.service';

@Component({
  selector: 'app-bl-snackbar',
  templateUrl: './bl-snackbar.component.html',
  styles: [
    `
      .listStyle {
        list-style-type: none;
        margin: 15px;
      }
    `,
  ],
  animations: [
    trigger('slideIn', [
      state(
        'visible',
        style({
          opacity: 1,
        }),
      ),

      state('invisible', style({ opacity: 0 })),

      transition(':enter', [
        style({
          opacity: 0,
          transform: '{{transformAnimation}}',
        }),
        animate(300),
      ]),

      transition('visible => invisible', animate(100)),
    ]),
  ],
})
export class BlSnackbarComponent implements OnInit, OnDestroy {
  toAnimationState = 'visible';
  screenSize;
  subscription: Subscription;

  constructor(
    private blSnackbarService: BlSnackbarService,
    private responsiveService: ResponsiveService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.responsiveService.getScreenSize().subscribe((size) => {
      this.screenSize = size;
    });
  }

  changeAnimationState(AnimationState: string): void {
    this.toAnimationState = AnimationState;
  }

  getSnackbarArray(): SnackbarMessage[] {
    const snackbars = this.blSnackbarService.getSnackbarArray();
    return snackbars.filter((snackbar) => snackbar.visible === true);
  }

  currentState(): boolean {
    return Array.hasValues(this.getSnackbarArray());
  }

  hideSnackbar(snackbar: SnackbarMessage): void {
    this.changeAnimationState('invisible');
    setTimeout(() => {
      snackbar.visible = false;
      this.changeAnimationState('visible');
    }, 200);
  }

  getHeaderText(snackbar: SnackbarMessage): string {
    return snackbar.headerText;
  }

  getContentText(snackbar: SnackbarMessage): string {
    return snackbar.contentText;
  }
  snackbarType(snackbar: SnackbarMessage): string {
    return snackbar.type;
  }
  isDismissable(snackbar: SnackbarMessage): boolean {
    return snackbar.dismissable;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
