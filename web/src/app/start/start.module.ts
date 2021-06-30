import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './page/start/start.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromStart from './store/start.reducer';
import { CoreModule } from '@core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { StartEffects } from './store/start.effects';
import { SharedModule } from '@shared/shared.module';

export const START_ROUTES: Routes = [
  {
    path: '',
    component: StartComponent
  }
];

@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(START_ROUTES),
    StoreModule.forFeature(fromStart.startFeatureKey, fromStart.reducer),
    EffectsModule.forFeature([StartEffects]),
    CoreModule,
    SharedModule,
  ]
})
export class StartModule { }
