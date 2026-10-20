import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Lang } from '../core/i18n/dictionary';
import { I18nService } from '../core/i18n/i18n.service';
import { Navbar } from './navbar';

/** Wraps every public page. The language comes from the /en or /ar route prefix. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Navbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    <app-navbar />
    <main id="main">
      <router-outlet />
    </main>
    <footer class="footer">
      <div class="container footer__inner">
        <span>© {{ year }} {{ t().brand.person }}</span>
        <span>{{ t().footer.rights }}</span>
      </div>
    </footer>
    <button type="button" class="totop" [class.totop--show]="showTop()" [attr.aria-label]="t().nav.toTop" [attr.tabindex]="showTop() ? 0 : -1" (click)="toTop()">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  `,
  styles: `
    .footer { border-block-start: 1px solid var(--border); padding-block: 28px; color: var(--text-muted); font-size: 0.95rem; }
    .footer__inner { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; }
    .totop {
      position: fixed;
      inset-block-end: 22px;
      inset-inline-end: 22px;
      z-index: 50;
      width: 48px;
      height: 48px;
      display: grid;
      place-items: center;
      border: 0;
      border-radius: 50%;
      background: var(--accent);
      color: var(--accent-contrast);
      box-shadow: var(--shadow);
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: translateY(16px);
      transition: opacity 0.3s, transform 0.3s var(--ease-out), visibility 0.3s;
    }
    .totop--show { opacity: 1; visibility: visible; transform: none; }
    .totop:hover { transform: translateY(-3px); }
  `,
})
export class Shell {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly year = new Date().getFullYear();
  protected readonly showTop = signal(false);

  protected onScroll(): void {
    this.showTop.set(window.scrollY > 600);
  }

  protected toTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  constructor() {
    const lang = inject(ActivatedRoute).snapshot.data['lang'] as Lang;
    this.i18n.setLang(lang);
  }
}
