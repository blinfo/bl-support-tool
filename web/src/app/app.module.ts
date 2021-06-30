import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { MsalAngularConfiguration, MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { Configuration } from 'msal';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import '@angular/common/locales/global/sv';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: '112e047b-ef64-4ccc-93a6-6f8b50a5a76f',
      authority: 'https://login.microsoftonline.com/37a49a16-b27c-4909-9891-338b46379b9d',
      validateAuthority: true,
      redirectUri: environment.appUrl,
      // navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
  };
}

export const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com/v1.0/me', ['user.read']],
  [environment.apiUrl, ['112e047b-ef64-4ccc-93a6-6f8b50a5a76f/user.read']],
];

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: !isIE,
    unprotectedResources: [],
    protectedResourceMap,
    consentScopes: ['user.read', 'openid', 'profile'],
    extraQueryParameters: {},
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    MsalModule.forRoot(MSALConfigFactory(), MSALAngularConfigFactory()),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'sv-SE',
    },
    {
      provide: LOCALE_ID,
      useValue: 'sv-SE',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
