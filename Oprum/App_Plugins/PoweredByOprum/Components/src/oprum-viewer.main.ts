import { enableProdMode, ElementRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { OprumViewerModule } from './app/oprum-viewer/oprum-viewer.module';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(OprumViewerModule)
  .catch(err => console.log("Error loading module", err));