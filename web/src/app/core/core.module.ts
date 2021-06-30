import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NavMenuComponent } from './menu/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { DetailViewComponent } from '@shared/components/detail-view/detail-view.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TopMenuComponent } from './menu/top-menu/top-menu.component';
import { BlSnackbarComponent } from './bl-snackbar/bl-snackbar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SubMenuComponent } from './menu/sub-menu/sub-menu.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    NavMenuComponent,
    MainMenuComponent,
    DetailViewComponent,
    TopMenuComponent,
    BlSnackbarComponent,
    SubMenuComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    MatSidenavModule,
    CommonModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
  ],
  providers: [],
  exports: [DetailViewComponent],
})
export class CoreModule {}
