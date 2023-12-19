import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TemplatePageTitleStrategy } from './template-page-title-strategy';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), 
    provideAnimations(),
    {
      provide: TitleStrategy, useClass: TemplatePageTitleStrategy
    },
    provideHttpClient(
      withFetch()
    ),
  ]
};

