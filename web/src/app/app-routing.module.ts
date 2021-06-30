import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavMenuComponent } from '@core/menu/nav-menu/nav-menu.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { NotAuthorizedComponent } from '@shared/components/not-authorized/not-authorized.component';

const routes: Routes = [
  {
    path: 'error',
    component: NotAuthorizedComponent,
  },
  {
    path: '',
    component: NavMenuComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./start/start.module').then((m) => m.StartModule),
      },
      {
        path: 'users',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'connections',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./connection/connection.module').then((m) => m.ConnectionModule),
      },
      {
        path: 'companies',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./company/company.module').then((m) => m.CompanyModule),
      },
      {
        path: 'system-info',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./system-info/system-info.module').then((m) => m.SystemInfoModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
