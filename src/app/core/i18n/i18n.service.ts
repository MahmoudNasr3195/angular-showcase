import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DICTIONARY, L10n, Lang } from './dictionary';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);

  readonly lang = signal<Lang>('en');
  readonly dir = computed(() => (this.lang() === 'ar' ? 'rtl' : 'ltr'));
  readonly t = computed(() => DICTIONARY[this.lang()]);
  readonly otherLang = computed<Lang>(() => (this.lang() === 'ar' ? 'en' : 'ar'));

  /** Locale used for dates. Arabic is forced to the Gregorian calendar and Latin digits, matching the rest of the site. */
  readonly dateLocale = computed(() => (this.lang() === 'ar' ? 'ar-u-ca-gregory-nu-latn' : 'en'));

  /** Pick the current-language string. Reads the lang signal, so calling it in a template stays reactive. */
  pick(value: L10n): string {
    return value[this.lang()];
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
    const root = this.doc.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  /** Same page, other language: /en -> /ar */
  switchLanguage(): void {
    const target = this.otherLang();
    const url = this.router.url.replace(/^\/(en|ar)(?=\/|$|\?|#)/, `/${target}`);
    void this.router.navigateByUrl(url);
  }
}
