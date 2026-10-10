import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { from, Observable, of } from 'rxjs';
import en from '../../../assets/i18n/en.json';

/**
 * Englisch (Standardsprache) liegt direkt im Bundle, damit der erste Render
 * nicht auf einen zusätzlichen HTTP-Request warten muss. Deutsch wird erst
 * beim Umschalten als eigener Chunk nachgeladen.
 */
export class BundledTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    if (lang === 'de') {
      return from(import('../../../assets/i18n/de.json').then((m) => m.default));
    }
    return of(en);
  }
}
