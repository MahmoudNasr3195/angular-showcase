import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { I18nService } from '../../core/i18n/i18n.service';
import { SeoService } from '../../core/seo.service';

/**
 * Real 404 page. Prerendered as /404/index.html (English) and served with a 404 status by the host.
 * Outside the language Shell, so it picks the language from the URL the visitor actually asked for (/ar/... -> Arabic).
 */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="nf container" id="main">
      <p class="nf__code" aria-hidden="true">404</p>
      <h1>{{ t().notFound.title }}</h1>
      <p>{{ t().notFound.text }}</p>
      <a class="nf__link" [routerLink]="['/', lang()]">{{ t().notFound.home }}</a>
    </main>
  `,
  styles: `
    .nf {
      min-height: 100vh;
      display: grid;
      align-content: center;
      justify-items: start;
      gap: 12px;
      padding-block: 96px;
    }
    .nf__code {
      margin: 0;
      font-size: clamp(5rem, 18vw, 10rem);
      font-weight: 700;
      line-height: 1;
      color: var(--accent);
    }
    h1 { margin: 0; font-size: clamp(1.8rem, 4vw, 2.8rem); }
    p { margin: 0; color: var(--text-muted); font-size: 1.2rem; }
    .nf__link {
      margin-block-start: 12px;
      padding: 12px 22px;
      border-radius: 999px;
      background: var(--accent);
      color: var(--accent-contrast);
      font-weight: 700;
      text-decoration: none;
    }
  `,
})
export class NotFound {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly lang = this.i18n.lang;

  constructor() {
    const router = inject(Router);
    const title = inject(Title);
    const seo = inject(SeoService);
    seo.noindex();
    title.setTitle(this.t().notFound.docTitle);
    // Prerender is English. In the browser, switch to the language of the URL the visitor asked for.
    afterNextRender(() => {
      const lang = router.url.startsWith('/ar') || location.pathname.startsWith('/ar') ? 'ar' : 'en';
      this.i18n.setLang(lang);
      title.setTitle(this.t().notFound.docTitle);
    });
  }
}
