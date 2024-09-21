import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { appRouting } from './app/app-routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    appRouting,
    importProvidersFrom(BrowserAnimationsModule)
  ]
}).catch(err => console.error(err));
