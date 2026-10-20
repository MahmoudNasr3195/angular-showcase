import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { I18nService } from './i18n/i18n.service';
import { SITE } from './site.config';

/**
 * Per-page, per-language head tags: title, description, canonical, hreflang alternates and
 * Open Graph / Twitter card. Runs during prerender, so crawlers and link-preview bots see the right language.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly doc = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly i18n = inject(I18nService);

  /** `path` is the page path without the language prefix: '' (home). */
  set(page: { path: string; title: string; description: string; jsonLd?: object; image?: string; noindex?: boolean }): void {
    const lang = this.i18n.lang();
    const other = this.i18n.otherLang();
    // Trailing slash: Netlify serves each page as a directory index and 301s /en to /en/, so the canonical must match.
    const url = (l: string) => `${SITE.domain}/${l}/${page.path ? page.path + '/' : ''}`;
    const image = `${SITE.domain}/${page.image ?? `og/og-${lang}.jpg`}`;
    const name = lang === 'ar' ? 'محمود إبراهيم نصر' : SITE.personName;

    this.title.setTitle(page.title);
    const tags: Array<[string, string, string]> = [
      ['name', 'description', page.description],
      ['name', 'robots', page.noindex ? 'noindex, nofollow, noarchive' : 'index, follow'],
      ['property', 'og:type', 'website'],
      ['property', 'og:site_name', name],
      ['property', 'og:title', page.title],
      ['property', 'og:description', page.description],
      ['property', 'og:url', url(lang)],
      ['property', 'og:locale', lang === 'ar' ? 'ar_SA' : 'en_US'],
      ['property', 'og:locale:alternate', other === 'ar' ? 'ar_SA' : 'en_US'],
      ['property', 'og:image', image],
      ['property', 'og:image:width', '1200'],
      ['property', 'og:image:height', '630'],
      ['property', 'og:image:alt', lang === 'ar' ? 'محمود إبراهيم نصر، مهندس واجهات أمامية أول (Angular)' : 'Mahmoud Ibrahim Nasr, Senior Frontend Engineer (Angular)'],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', page.title],
      ['name', 'twitter:description', page.description],
      ['name', 'twitter:image', image],
    ];
    for (const [attr, key, content] of tags) {
      this.meta.updateTag({ [attr]: key, content }, `${attr}="${key}"`);
    }

    this.link('canonical', url(lang));
    this.alternate('en', url('en'));
    this.alternate('ar', url('ar'));
    this.alternate('x-default', url('en'));

    if (page.jsonLd) this.structuredData(page.jsonLd);
  }

  /** Keep this page out of search results (used by the 404 page). */
  noindex(): void {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' }, 'name="robots"');
    this.doc.head.querySelector('script#ld-json')?.remove();
  }

  /** One JSON-LD script in <head>; replaced on every navigation. `<` is escaped so the JSON can never close the tag. */
  private structuredData(graph: object): void {
    let el = this.doc.head.querySelector<HTMLScriptElement>('script#ld-json');
    if (!el) {
      el = this.doc.createElement('script');
      el.id = 'ld-json';
      el.type = 'application/ld+json';
      this.doc.head.appendChild(el);
    }
    el.textContent = JSON.stringify(graph).replace(/</g, '\\u003c');
  }

  private link(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
    let el = this.doc.head.querySelector<HTMLLinkElement>(selector);
    if (!el) {
      el = this.doc.createElement('link');
      el.rel = rel;
      if (hreflang) el.hreflang = hreflang;
      this.doc.head.appendChild(el);
    }
    el.href = href;
  }

  private alternate(hreflang: string, href: string): void {
    this.link('alternate', href, hreflang);
  }
}
