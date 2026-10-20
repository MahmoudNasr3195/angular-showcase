import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../core/i18n/i18n.service';
import { SITE } from '../core/site.config';
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'close()', '(window:resize)': 'onResize()' },
  template: `
    <header class="nav" [class.nav--open]="open()">
      <div class="container nav__inner">
        <a class="nav__brand" [routerLink]="['/', i18n.lang()]" [attr.aria-label]="t().nav.homeLabel">
          <img src="brand/logo-original.png" alt="" width="36" height="41" />
          <span class="nav__name">{{ t().brand.person }}</span>
        </a>

        <nav class="nav__links" [attr.aria-label]="t().nav.primary">
          @for (l of links; track l.id) {
            <a [routerLink]="['/', i18n.lang()]" [fragment]="l.id">{{ t().nav.links[l.key] }}</a>
          }
        </nav>

        <div class="nav__actions">
          <a class="btn btn--ghost nav__contact" [href]="'mailto:' + email">{{ t().nav.contact }}</a>

          <button
            type="button"
            class="icon-btn"
            (click)="i18n.switchLanguage()"
            [attr.aria-label]="t().nav.switchLabel"
            [attr.lang]="i18n.otherLang()"
          >
            {{ t().nav.switchTo }}
          </button>

          <button
            type="button"
            class="icon-btn icon-btn--round"
            (click)="toggleTheme($event)"
            [attr.aria-label]="isDark() ? t().nav.themeToLight : t().nav.themeToDark"
          >
            @if (isDark()) {
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <circle cx="12" cy="12" r="4.2" fill="currentColor" />
                <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3l1.7 1.7M17 17l1.7 1.7M5.3 18.7 7 17M17 7l1.7-1.7" />
                </g>
              </svg>
            } @else {
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" fill="currentColor" />
              </svg>
            }
          </button>

          <button
            type="button"
            class="icon-btn icon-btn--round nav__burger"
            (click)="toggle()"
            [attr.aria-expanded]="open()"
            aria-controls="nav-menu"
            [attr.aria-label]="open() ? t().nav.closeMenu : t().nav.openMenu"
          >
            <span class="burger" aria-hidden="true"><i></i><i></i><i></i></span>
          </button>
        </div>
      </div>

      <div class="nav__scrim" (click)="close()"></div>
      <nav id="nav-menu" class="nav__menu" [attr.aria-label]="t().nav.primary" [attr.inert]="open() ? null : ''">
        @for (l of links; track l.id) {
          <a [routerLink]="['/', i18n.lang()]" [fragment]="l.id" (click)="close()" [style.--i]="$index">{{ t().nav.links[l.key] }}</a>
        }
        <a class="nav__menu-cta" [href]="'mailto:' + email" (click)="close()" [style.--i]="links.length">{{ t().nav.contact }}</a>
      </nav>
    </header>
  `,
  styles: `
    .nav {
      position: sticky;
      top: 0;
      z-index: 10;
      height: var(--nav-h);
      backdrop-filter: blur(14px) saturate(1.4);
      background: color-mix(in srgb, var(--bg) 72%, transparent);
      border-block-end: 1px solid var(--border);
    }
    .nav__inner {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .nav__brand {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      font-weight: 700;
    }
    .nav__brand img {
      height: 36px;
      width: auto;
    }
    .nav__links {
      display: flex;
      gap: clamp(14px, 2.4vw, 30px);
      margin-inline: auto 12px;
    }
    .nav__links a {
      text-decoration: none;
      font-weight: 600;
      font-size: 0.98rem;
      color: var(--text-muted);
      padding-block: 8px;
      transition: color 0.25s;
    }
    .nav__links a:hover { color: var(--accent); }
    .nav__actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    /* Needs the .icon-btn prefix: .icon-btn (declared later) also sets display and would otherwise win. */
    .icon-btn.nav__burger { display: none; }
    .nav__scrim, .nav__menu { display: none; }
    @media (max-width: 1000px) {
      .nav__links { display: none; }
      .icon-btn.nav__burger { display: inline-grid; }
      .nav__scrim {
        display: block;
        position: fixed;
        inset: var(--nav-h) 0 0 0;
        background: color-mix(in srgb, var(--bg) 55%, rgba(6, 9, 28, 0.55));
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
      }
      .nav__menu {
        display: grid;
        gap: 4px;
        position: absolute;
        inset-block-start: 100%;
        inset-inline: 0;
        padding: 14px var(--gutter) 22px;
        background: var(--bg);
        border-block-end: 1px solid var(--border);
        box-shadow: var(--shadow);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-12px);
        transition: opacity 0.3s, transform 0.4s var(--ease-out), visibility 0.3s;
      }
      .nav--open .nav__scrim { opacity: 1; visibility: visible; }
      .nav--open .nav__menu { opacity: 1; visibility: visible; transform: none; }
      .nav__menu a {
        display: block;
        padding: 14px 6px;
        text-decoration: none;
        font-weight: 700;
        font-size: 1.15rem;
        border-block-end: 1px solid var(--border);
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.35s var(--ease-out), transform 0.35s var(--ease-out), color 0.25s;
        transition-delay: calc(var(--i) * 40ms);
      }
      .nav--open .nav__menu a { opacity: 1; transform: none; }
      .nav__menu a:hover { color: var(--accent); }
      .nav__menu .nav__menu-cta {
        margin-top: 14px;
        text-align: center;
        border: 0;
        border-radius: 999px;
        background: var(--accent);
        color: var(--accent-contrast);
      }
      .nav__menu .nav__menu-cta:hover { color: var(--accent-contrast); }
    }
    .burger { display: grid; gap: 5px; width: 20px; }
    .burger i { display: block; height: 2.2px; border-radius: 2px; background: currentColor; transition: transform 0.35s var(--ease-out), opacity 0.2s; }
    .nav--open .burger i:nth-child(1) { transform: translateY(7.2px) rotate(45deg); }
    .nav--open .burger i:nth-child(2) { opacity: 0; }
    .nav--open .burger i:nth-child(3) { transform: translateY(-7.2px) rotate(-45deg); }
    .btn {
      display: inline-flex;
      align-items: center;
      padding: 9px 18px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: background 0.25s, border-color 0.25s, transform 0.25s var(--ease-out);
    }
    .btn--ghost {
      border: 1px solid var(--border);
    }
    .btn--ghost:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
    }
    .icon-btn {
      appearance: none;
      border: 1px solid var(--border);
      background: transparent;
      color: inherit;
      font: inherit;
      font-weight: 600;
      font-size: 0.95rem;
      min-width: 44px;
      height: 44px;
      padding-inline: 14px;
      border-radius: 999px;
      cursor: pointer;
      display: inline-grid;
      place-items: center;
      transition: border-color 0.25s, color 0.25s, transform 0.25s var(--ease-out);
    }
    .icon-btn--round {
      padding: 0;
      width: 44px;
    }
    .icon-btn:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
    @media (max-width: 640px) {
      .nav__name {
        display: none;
      }
      .nav__contact {
        display: none;
      }
    }
  `,
})
export class Navbar {
  protected readonly i18n = inject(I18nService);
  private readonly theme = inject(ThemeService);

  protected readonly t = this.i18n.t;
  protected readonly isDark = computed(() => this.theme.mode() === 'dark');
  protected readonly email = SITE.email;
  protected readonly links = [
    { id: 'expertise', key: 'expertise' },
    { id: 'experience', key: 'experience' },
    { id: 'work', key: 'work' },
    { id: 'stack', key: 'stack' },
    { id: 'contact', key: 'contact' },
  ] as const;

  protected readonly open = signal(false);

  protected toggle(): void {
    this.open.update((v) => !v);
  }

  protected close(): void {
    if (this.open()) this.open.set(false);
  }

  protected onResize(): void {
    if (window.innerWidth > 1000) this.close();
  }

  protected toggleTheme(event: MouseEvent): void {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    this.theme.toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }
}
