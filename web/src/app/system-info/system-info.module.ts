import { NgModule } from '@angular/core';
import { SystemInfoComponent } from './pages/system-info/system-info.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';
import { SystemInfoListComponent } from './components/system-info-list/system-info-list.component';
import { SystemInfoDialogComponent } from './components/system-info-dialog/system-info-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

export const SYSTEM_INFO_ROUTES: Routes = [
  {
    path: '',
    component: SystemInfoComponent,
    children: [],
  },
];

@NgModule({
  declarations: [SystemInfoComponent, SystemInfoListComponent, SystemInfoDialogComponent],
  imports: [
    RouterModule.forChild(SYSTEM_INFO_ROUTES),
    SharedModule,
    CoreModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule.setLocale('sv-SE'),
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  providers: [MatDatepickerModule],
})
export class SystemInfoModule {}
