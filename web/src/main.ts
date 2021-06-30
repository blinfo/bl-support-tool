import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import './array.extensions';

if (environment.production) {
  enableProdMode();

  // Om console.log används i koden visas inget i konsolen i produktion.
  window.console.log = () => {};
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
