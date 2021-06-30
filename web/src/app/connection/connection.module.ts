import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionShellComponent } from './page/connection-shell/connection-shell.component';
import { ConnectionTableComponent } from './page/connection-table/connection-table.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromConnection from './store/connection.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ConnectionEffects } from './store/connection.effects';
import { SharedModule } from '../shared/shared.module';

export const CONNECTION_ROUTES: Routes = [
  {
    path: '',
    component: ConnectionShellComponent,
    children: [
      {
        path: '',
        component: ConnectionTableComponent
      }
    ]
  }
];

@NgModule({
  declarations: [ConnectionShellComponent, ConnectionTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CONNECTION_ROUTES),
    StoreModule.forFeature(fromConnection.connectionFeatureKey, fromConnection.reducer),
    EffectsModule.forFeature([ConnectionEffects]),
    SharedModule,
  ],
})
export class ConnectionModule { }
