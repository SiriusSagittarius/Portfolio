import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // Konfiguriere hier den generellen Translate-Service (z.B. Fallback-Sprache)
    provideTranslateService({
      fallbackLang: 'de',
    }),
    // Diese Funktion ersetzt die alte Factory und stellt den HttpLoader sowie Config-Tokens bereit
    provideTranslateHttpLoader(),
  ],
};
