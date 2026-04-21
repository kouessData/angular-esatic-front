import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
//import { AppComponent } from './app/app';
import { App } from './app/app';

import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(App , {
  providers: [
    provideAnimations()
  ]
});