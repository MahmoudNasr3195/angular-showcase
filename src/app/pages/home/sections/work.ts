import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { SYSTEMS, System } from '../../../core/cv-data';
import { I18nService } from '../../../core/i18n/i18n.service';
import { HairlineFigure } from '../../../shared/hairline-figure';
import { Reveal } from '../../../shared/reveal.directive';

@Component({
  selector: 'app-work',
  imports: [Reveal, HairlineFigure],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onKey($event)' },
  template: `
    <section id="work" class="section container" aria-labelledby="work-title">
      <div class="headrow">
        <header class="section__head" appReveal>
          <p class="section__eyebrow">{{ t().work.eyebrow }}</p>
          <h2 id="work-title" class="section__title">{{ t().work.title }}</h2>
          <p class="section__intro">{{ t().work.intro }}</p>
        </header>
        <div class="headrow__figure" appReveal aria-hidden="true">
          @defer (on viewport) {
            <app-hairline figure="rebuild" />
          } @placeholder {
            <div class="headrow__ph"></div>
          }
        </div>
      </div>

      <div class="systems">
        @for (s of systems; track s.id) {
          <article class="system" [class.system--flip]="$index % 2 === 1" appReveal>
            <div class="system__visual" [attr.aria-hidden]="s.gallery ? null : true">
              @if (s.screenshot) {
                <img [src]="s.screenshot" alt="" loading="lazy" decoding="async" />
                <span class="system__tag">{{ t().work.uiDesign }}</span>
                @if (s.gallery && s.gallery.length > 1) {
                  <button type="button" class="system__open" (click)="show(s, 0)">
                    <span class="system__count">{{ s.gallery.length }} {{ t().work.screens }}</span>
                    <span class="sr-only">{{ t().work.viewScreens }}: {{ i18n.pick(s.name) }}</span>
                  </button>
                }
              } @else {
                <div class="mock">
                  <div class="mock__bar"><i></i><i></i><i></i></div>
                  <div class="mock__body">
                    <div class="mock__side"><b></b><b></b><b></b><b></b></div>
                    <div class="mock__main">
                      <div class="mock__row mock__row--wide"></div>
                      <div class="mock__tiles"><b></b><b></b><b></b></div>
                      <div class="mock__row"></div>
                      <div class="mock__row mock__row--short"></div>
                    </div>
                  </div>
                </div>
              }
            </div>

            <div class="system__copy">
              <p class="system__client">{{ t().work.client }} · {{ i18n.pick(s.client) }}</p>
              <h3 class="system__name">{{ i18n.pick(s.name) }}</h3>
              <p class="system__summary">{{ i18n.pick(s.summary) }}</p>

              <h4 class="system__sub">{{ t().work.role }}</h4>
              <ul class="system__role">
                @for (r of s.role; track $index) {
                  <li>{{ i18n.pick(r) }}</li>
                }
              </ul>

              <h4 class="system__sub">{{ t().work.builtWith }}</h4>
              <ul class="tags">
                @for (tag of s.tags; track tag) {
                  <li dir="ltr">{{ tag }}</li>
                }
              </ul>
            </div>
          </article>
        }
      </div>
    </section>

    @if (current(); as c) {
      <div class="lb" role="dialog" aria-modal="true" [attr.aria-label]="i18n.pick(c.system.name)" (click)="close()">
        <figure class="lb__fig" (click)="$event.stopPropagation()">
          <img [src]="c.shot.src" [alt]="i18n.pick(c.shot.caption)" decoding="async" />
          <figcaption>
            <span class="lb__tag">{{ t().work.uiDesign }}</span>
            {{ i18n.pick(c.shot.caption) }} · {{ c.index + 1 }}/{{ c.total }}
          </figcaption>
        </figure>
        <button type="button" class="lb__btn lb__close" (click)="close()" [attr.aria-label]="t().work.close">×</button>
        <button type="button" class="lb__btn lb__nav lb__prev" (click)="step(-1); $event.stopPropagation()" [attr.aria-label]="t().work.prev">
          ‹
        </button>
        <button type="button" class="lb__btn lb__nav lb__next" (click)="step(1); $event.stopPropagation()" [attr.aria-label]="t().work.next">
          ›
        </button>
      </div>
    }
  `,
  styles: `
    .systems { display: grid; gap: clamp(28px, 5vw, 56px); margin-top: 44px; }
    .system {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
      gap: clamp(22px, 4vw, 52px);
      align-items: center;
      padding: clamp(18px, 3vw, 32px);
      border-radius: var(--radius-l);
      background: var(--bg-elevated);
      border: 1px solid var(--border);
    }
    .system--flip .system__visual { order: 2; }
    .system__visual {
      position: relative;
      aspect-ratio: 16 / 9;
      border-radius: var(--radius-m);
      overflow: hidden;
      border: 1px solid var(--border);
      background: linear-gradient(145deg, color-mix(in srgb, var(--accent) 14%, var(--bg)), color-mix(in srgb, var(--accent-2) 14%, var(--bg)));
    }
    .system__open { position: absolute; inset: 0; border: 0; padding: 0; background: transparent; cursor: zoom-in; }
    .system__open:focus-visible { outline: 3px solid var(--accent); outline-offset: -3px; border-radius: var(--radius-m); }
    .system__count {
      position: absolute;
      inset-block-end: 10px;
      inset-inline-end: 10px;
      padding: 4px 12px;
      border-radius: 999px;
      background: var(--accent);
      color: var(--accent-contrast);
      font-size: 0.8rem;
      font-weight: 700;
    }
    .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
    .lb {
      position: fixed;
      inset: 0;
      z-index: 100;
      display: grid;
      place-items: center;
      padding: clamp(12px, 3vw, 40px);
      background: rgba(6, 9, 28, 0.86);
      animation: lb-in 0.25s var(--ease-out) backwards;
    }
    .lb__fig { margin: 0; max-width: min(1280px, 100%); display: grid; gap: 12px; justify-items: center; }
    .lb__fig img { max-width: 100%; max-height: 78vh; border-radius: var(--radius-s); background: #fff; }
    .lb__fig figcaption { color: var(--on-navy); font-weight: 600; text-align: center; }
    .lb__tag { margin-inline-end: 8px; padding: 2px 10px; border-radius: 999px; background: var(--gold-400); color: var(--navy-900); font-size: 0.8rem; }
    .lb__btn {
      position: absolute;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.35);
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
      font-size: 1.8rem;
      line-height: 1;
      cursor: pointer;
    }
    .lb__btn:hover { background: rgba(255, 255, 255, 0.24); }
    .lb__btn:focus-visible { outline: 3px solid var(--gold-400); outline-offset: 2px; }
    .lb__close { inset-block-start: 16px; inset-inline-end: 16px; }
    .lb__nav { inset-block-start: 50%; transform: translateY(-50%); }
    .lb__prev { inset-inline-start: 16px; }
    .lb__next { inset-inline-end: 16px; }
    @keyframes lb-in { from { opacity: 0; } to { opacity: 1; } }
    .system__tag {
      position: absolute;
      inset-block-end: 10px;
      inset-inline-start: 10px;
      padding: 4px 12px;
      border-radius: 999px;
      background: var(--navy-900);
      color: var(--on-navy);
      font-size: 0.8rem;
      font-weight: 600;
    }
    .system__visual img { width: 100%; height: 100%; object-fit: contain; display: block; }

    /* abstract interface mock shown until a real (masked) screenshot is added */
    .mock { height: 100%; display: flex; flex-direction: column; padding: 14px; gap: 10px; }
    .mock__bar { display: flex; gap: 6px; }
    .mock__bar i { width: 9px; height: 9px; border-radius: 50%; background: var(--border); }
    .mock__body { flex: 1; display: grid; grid-template-columns: 22% 1fr; gap: 12px; min-height: 0; }
    .mock__side { display: grid; align-content: start; gap: 8px; padding: 10px; border-radius: 10px; background: color-mix(in srgb, var(--accent) 14%, transparent); }
    .mock__side b { height: 8px; border-radius: 4px; background: color-mix(in srgb, var(--accent) 40%, transparent); }
    .mock__main { display: grid; align-content: start; gap: 10px; }
    .mock__row { height: 12px; border-radius: 6px; background: color-mix(in srgb, var(--text) 14%, transparent); }
    .mock__row--wide { height: 18px; width: 70%; background: color-mix(in srgb, var(--accent) 45%, transparent); }
    .mock__row--short { width: 55%; }
    .mock__tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .mock__tiles b { height: 54px; border-radius: 10px; background: color-mix(in srgb, var(--accent-2) 30%, transparent); }

    .system__client { margin: 0; color: var(--accent-2); font-weight: 700; font-size: 0.92rem; }
    .system__name { margin-top: 16px; font-size: clamp(1.6rem, 3vw, 2.2rem); }
    .system__summary { margin: 12px 0 0; color: var(--text-muted); }
    .system__sub { margin: 22px 0 8px; font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); }
    :host-context(html[lang='ar']) .system__sub { letter-spacing: 0; text-transform: none; font-size: 0.95rem; }
    .system__role { margin: 0; padding-inline-start: 1.15em; display: grid; gap: 6px; }
    .system__role li::marker { color: var(--accent); }
    .tags { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
    .tags li {
      padding: 5px 12px;
      border-radius: 999px;
      font-size: 0.88rem;
      font-weight: 600;
      border: 1px solid var(--border);
      color: var(--text);
      background: color-mix(in srgb, var(--accent) 8%, transparent);
    }
    @media (max-width: 860px) {
      .system { grid-template-columns: 1fr; }
      .system--flip .system__visual { order: 0; }
    }
  `,
})
export class Work {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly systems = SYSTEMS;

  private readonly open = signal<{ system: System; index: number } | null>(null);
  protected readonly current = computed(() => {
    const o = this.open();
    const gallery = o?.system.gallery;
    if (!o || !gallery) return null;
    return { system: o.system, shot: gallery[o.index], index: o.index, total: gallery.length };
  });

  protected show(system: System, index: number): void {
    this.open.set({ system, index });
    setTimeout(() => document.querySelector<HTMLElement>('.lb__close')?.focus());
  }

  protected close(): void {
    this.open.set(null);
  }

  protected step(delta: number): void {
    const o = this.open();
    const n = o?.system.gallery?.length ?? 0;
    if (!o || !n) return;
    this.open.set({ system: o.system, index: (o.index + delta + n) % n });
  }

  protected onKey(e: KeyboardEvent): void {
    if (!this.open()) return;
    const rtl = this.i18n.dir() === 'rtl';
    if (e.key === 'Escape') this.close();
    else if (e.key === 'ArrowRight') this.step(rtl ? -1 : 1);
    else if (e.key === 'ArrowLeft') this.step(rtl ? 1 : -1);
  }
}
