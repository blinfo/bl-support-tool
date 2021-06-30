import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './store/auth/auth.reducer';
import * as fromTable from './store/table/table.reducer';
import * as fromMenu from './store/menu/menu.reducer';
import * as fromSubscription from './store/subscription/subscription.reducer';
import * as fromSystemInfo from '@shared/store/system-info/system-info.reducer';
import * as fromProperty from '@shared/store/propety/property.reducer';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { UrlSanitizerPipe } from './pipes/url-sanitizer.pipe';
import { BlDropdownComponent } from './components/bl-dropdown/bl-dropdown.component';
import {
  DropdownHeaderDirective,
  DropdownOptionDirective,
  DropdownOptionSelectedDirective,
  DropdownRootDirective,
  DropdownRootNotSelectedDirective,
  DropdownRootSelectedDirective,
  MouseListenerDirective,
} from './components/bl-dropdown/bl-dropdown.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { UserRightPipe } from './pipes/user-right.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PluckPipe } from './pipes/pluck.pipe';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { ChartComponent } from './components/chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { TableComponent } from './components/table/table.component';
import { TableColumnDirective } from './directives/table-column.directive';
import {
  BlTableInnerCustomFooterComponent,
  TableCustomFooterComponent,
} from './components/table-custom-footer/table-custom-footer.component';
import { TableCustomFooterDesktopDirective } from './directives/table-custom-footer-desktop.directive';
import { TableCustomFooterMobileDirective } from './directives/table-custom-footer-mobile.directive';
import { TableViewComponent } from './components/table-view/table-view.component';
import { TableEffects } from './store/table/table.effects';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ButtonFilterComponent } from '@shared/filters/button/button-filter.component';
import { DatePickerFilterComponent } from '@shared/filters/datepicker/datepicker-filter.component';
import { DateSpanFilterComponent } from '@shared/filters/datespan/datespan-filter.component';
import { DropDownFilterComponent } from '@shared/filters/dropdown/dropdown-filter.component';
import { TextFilterComponent } from '@shared/filters/text/text-filter.component';
import { ToggleSwitchFilterComponent } from '@shared/filters/toggle-switch/toggle-switch-filter.component';
import { CheckboxFilterComponent } from '@shared/filters/checkbox/checkbox-filter-component';
import { SearchFilterComponent } from '@shared/filters/search/search-filter.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './entry-components/modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { DetailCardComponent } from './components/detail-card/detail-card.component';
import { CompanyDetailsComponent } from '../company/components/company-details/company-details.component';
import { BooleanCheckedPipe } from './pipes/booleanChecked.pipe';
import { SubscriptionEffects } from '@shared/store/subscription/subscription.effects';
import { SystemInfoEffects } from '@shared/store/system-info/system-info.effects';
import { DatePipe } from '@shared/pipes/date.pipe';
import { PropertyEffects } from '@shared/store/propety/property.effects';
import { FormRadioComponent } from './components/form-radio/form-radio.component';
import { SecretPopupComponent } from './components/secret-popup/secret-popup.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AvatarFallbackDirective } from '@shared/directives/avatar-fallback.directive';

@NgModule({
  declarations: [
    AvatarFallbackDirective,
    BlDropdownComponent,
    BlTableInnerCustomFooterComponent,
    ButtonFilterComponent,
    ChartComponent,
    CheckboxFilterComponent,
    DatePickerFilterComponent,
    DateSpanFilterComponent,
    DropDownFilterComponent,
    DropdownHeaderDirective,
    DropdownOptionDirective,
    DropdownOptionSelectedDirective,
    DropdownRootDirective,
    DropdownRootNotSelectedDirective,
    DropdownRootSelectedDirective,
    MouseListenerDirective,
    NotAuthorizedComponent,
    PaginatorComponent,
    PluckPipe,
    SearchFilterComponent,
    SubscriptionComponent,
    TableColumnDirective,
    TableComponent,
    TableCustomFooterComponent,
    TableCustomFooterDesktopDirective,
    TableCustomFooterMobileDirective,
    TableViewComponent,
    TextFilterComponent,
    ToggleSwitchFilterComponent,
    UrlSanitizerPipe,
    UserRightPipe,
    ModalComponent,
    DetailCardComponent,
    CompanyDetailsComponent,
    BooleanCheckedPipe,
    DatePipe,
    FormRadioComponent,
    SecretPopupComponent,
  ],
  imports: [
    CdkTableModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatBadgeModule,
    MatDialogModule,
    MatTooltipModule,
    NgSelectModule,
    NgxChartsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    StoreModule.forFeature(fromTable.tableFeatureKey, fromTable.reducer),
    StoreModule.forFeature(fromMenu.menuFeatureKey, fromMenu.reducer),
    StoreModule.forFeature(fromSubscription.subscriptionFeatureKey, fromSubscription.reducer),
    StoreModule.forFeature(fromSystemInfo.systemInfoFeatureKey, fromSystemInfo.reducer),
    StoreModule.forFeature(fromProperty.propertyFeatureKey, fromProperty.reducer),
    EffectsModule.forFeature([
      AuthEffects,
      TableEffects,
      SubscriptionEffects,
      SystemInfoEffects,
      PropertyEffects,
    ]),
    MatButtonModule,
    ScrollingModule,
  ],
  exports: [
    AvatarFallbackDirective,
    BlDropdownComponent,
    ButtonFilterComponent,
    ChartComponent,
    CheckboxFilterComponent,
    CommonModule,
    DatePickerFilterComponent,
    DateSpanFilterComponent,
    DropDownFilterComponent,
    DropdownHeaderDirective,
    DropdownOptionDirective,
    DropdownOptionSelectedDirective,
    DropdownRootDirective,
    DropdownRootNotSelectedDirective,
    DropdownRootSelectedDirective,
    MatBadgeModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    NgSelectModule,
    PaginatorComponent,
    ReactiveFormsModule,
    SearchFilterComponent,
    SubscriptionComponent,
    TableColumnDirective,
    TableComponent,
    TableCustomFooterComponent,
    TableCustomFooterDesktopDirective,
    TableCustomFooterMobileDirective,
    TableViewComponent,
    TextFilterComponent,
    ToggleSwitchFilterComponent,
    UrlSanitizerPipe,
    UserRightPipe,
    DetailCardComponent,
    CompanyDetailsComponent,
    BooleanCheckedPipe,
    DatePipe,
    FormRadioComponent,
    SecretPopupComponent,
  ],
  entryComponents: [ModalComponent],
})
export class SharedModule {}
