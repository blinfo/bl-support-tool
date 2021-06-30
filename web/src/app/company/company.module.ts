import { NgModule } from '@angular/core';
import { CompanyShellComponent } from './page/company-shell/company-shell.component';
import { CompanyTableComponent } from './page/company-table/company-table.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import * as fromCompany from './store/company.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CompanyEffects } from './store/company.effects';
import { CompanyComponent } from './page/company/company.component';
import { SubscriptionDetailsComponent } from './components/subscription-details/subscription-details.component';

export const COMPANY_ROUTES: Routes = [
  {
    path: '',
    component: CompanyShellComponent,
    children: [
      {
        path: '',
        component: CompanyTableComponent,
      },
      {
        path: ':id',
        component: CompanyComponent
      }
    ],
  },
];

@NgModule({
  declarations: [CompanyShellComponent, CompanyTableComponent, CompanyComponent, SubscriptionDetailsComponent],
  imports: [
    SharedModule,
    CoreModule,
    RouterModule.forChild(COMPANY_ROUTES),
    StoreModule.forFeature(fromCompany.companyFeatureKey, fromCompany.reducer),
    EffectsModule.forFeature([CompanyEffects])
  ]
})
export class CompanyModule {}
