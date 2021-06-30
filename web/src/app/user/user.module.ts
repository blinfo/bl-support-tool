import { NgModule } from '@angular/core';
import { UserShellComponent } from './page/user-shell/user-shell.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './page/user-table/user-table.component';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';
import { CoreModule } from '@core/core.module';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './page/user/user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddUserRightComponent } from './components/add-user-right/add-user-right.component';
import { UserRightComponent } from './components/user-right/user-right.component';
import { UserSubscriptionComponent } from './components/user-subscription/user-subscription.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UserShellComponent,
    children: [
      {
        path: '',
        component: UserTableComponent,
      },
      {
        path: ':id',
        component: UserComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    UserShellComponent,
    UserTableComponent,
    UserComponent,
    UserDetailsComponent,
    AddUserRightComponent,
    UserRightComponent,
    UserSubscriptionComponent,
    CompanyInfoComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(USER_ROUTES),
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects]),
    CoreModule,
    FormsModule,
    MatCheckboxModule,
  ],
})
export class UserModule {}
