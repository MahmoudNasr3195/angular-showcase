import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JOBS } from '../../../core/cv-data';
import { I18nService } from '../../../core/i18n/i18n.service';
import { CountUp } from '../../../shared/count-up';
import { HairlineFigure } from '../../../shared/hairline-figure';
import { Reveal } from '../../../shared/reveal.directive';
import { Spotlight } from '../../../shared/spotlight.directive';

/**
 * Career as a "journey": a King Saud University spotlight on top, then the roles as cards that
 * stack on top of each other while you scroll (sticky), newest first.
 */
@Component({
  selector: 'app-experience',
  imports: [Reveal, Spotlight, CountUp, RouterLink, HairlineFigure],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="section container" aria-labelledby="experience-title">
      <div class="headrow">
        <header class="section__head" appReveal>
          <p class="section__eyebrow">{{ t().experience.eyebrow }}</p>
          <h2 id="experience-title" class="section__title">{{ t().experience.title }}</h2>
        </header>
        <div class="headrow__figure" appReveal aria-hidden="true">
          @defer (on viewport) {
            <app-hairline figure="branches" />
          } @placeholder {
            <div class="headrow__ph"></div>
          }
        </div>
      </div>

      <div class="ksu" appReveal>
        <span class="ksu__orb ksu__orb--a" aria-hidden="true"></span>
        <span class="ksu__orb ksu__orb--b" aria-hidden="true"></span>
        <p class="ksu__eyebrow"><span class="live" aria-hidden="true"></span>{{ ksu().eyebrow }}</p>
        <h3 class="ksu__title">{{ ksu().title }}</h3>
        <p class="ksu__text">{{ ksu().text }}</p>
        <ul class="ksu__stats">
          <li><strong><app-count-up [value]="4" /></strong><span>{{ ksu().systems }}</span></li>
          <li><strong><app-count-up [value]="45" suffix="+" /></strong><span>{{ ksu().services }}</span></li>
          <li><strong dir="ltr">{{ since() }}</strong><span>{{ ksu().since }}</span></li>
        </ul>
        <a class="ksu__cta" [routerLink]="['/', i18n.lang()]" fragment="work">{{ ksu().cta }}</a>
      </div>

      <ol class="steps">
        @for (j of jobs(); track j.id; let i = $index) {
          <li class="step" [style.--i]="i">
            <article class="card" [class.card--ksu]="j.ksu" [class.card--now]="j.current" appSpotlight appReveal>
              <span class="card__year" aria-hidden="true">{{ j.year }}</span>
              <div class="card__top">
                <p class="card__period"><span class="live" aria-hidden="true" [class.live--off]="!j.current"></span>{{ j.period }}</p>
                @if (j.ksu) {
                  <span class="card__ksu">{{ ksu().badge }}</span>
                }
              </div>
              <h3 class="card__role">{{ j.role }}</h3>
              <p class="card__company">
                <bdi>{{ j.company }}</bdi>@if (j.context) {<span class="card__context"> · {{ j.context }}</span>}
              </p>
              <p class="card__summary">{{ j.summary }}</p>
            </article>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    .live {
      display: inline-block;
      width: 9px;
      height: 9px;
      margin-inline-end: 10px;
      border-radius: 50%;
      background: var(--gold-400);
      animation: pulse 2s infinite;
    }
    .live--off { background: var(--border); animation: none; }
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--gold-400) 70%, transparent); }
      70% { box-shadow: 0 0 0 9px transparent; }
      100% { box-shadow: 0 0 0 0 transparent; }
    }

    /* ---- King Saud University spotlight (navy in both themes, like the contact panel) ---- */
    .ksu {
      position: relative;
      overflow: hidden;
      margin-top: 40px;
      padding: clamp(26px, 5vw, 56px);
      border-radius: var(--radius-l);
      color: var(--on-navy);
      background:
        radial-gradient(700px circle at 100% 0%, color-mix(in srgb, var(--gold-400) 24%, transparent), transparent 60%),
        linear-gradient(140deg, var(--navy-900), var(--navy-700));
    }
    .ksu__orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(2px);
      pointer-events: none;
      animation: drift 9s ease-in-out infinite alternate;
    }
    .ksu__orb--a { width: 220px; height: 220px; inset-block-end: -90px; inset-inline-start: -60px; background: color-mix(in srgb, var(--blue-500) 45%, transparent); }
    .ksu__orb--b { width: 120px; height: 120px; inset-block-start: 24px; inset-inline-end: 22%; background: color-mix(in srgb, var(--gold-400) 28%, transparent); animation-delay: -4s; }
    @keyframes drift { to { transform: translate(24px, -18px) scale(1.12); } }
    .ksu > *:not(.ksu__orb) { position: relative; }
    .ksu__eyebrow { margin: 0; display: flex; align-items: center; color: var(--gold-400); font-weight: 700; }
    .ksu__title { margin-top: 10px; font-size: clamp(1.6rem, 3.6vw, 2.5rem); max-width: 18em; }
    .ksu__text { margin: 14px 0 0; max-width: 40em; color: var(--on-navy-muted); font-size: 1.08rem; }
    .ksu__stats { list-style: none; margin: 28px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 14px 40px; }
    .ksu__stats li { display: grid; gap: 2px; }
    .ksu__stats strong { font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1; color: var(--gold-400); font-variant-numeric: tabular-nums; }
    .ksu__stats span { color: var(--on-navy-muted); font-size: 0.95rem; }
    .ksu__cta {
      display: inline-flex;
      align-items: center;
      margin-top: 26px;
      min-height: 46px;
      padding: 0 24px;
      border-radius: 999px;
      background: var(--gold-400);
      color: var(--navy-900);
      font-weight: 800;
      text-decoration: none;
      transition: transform 0.3s var(--ease-out), box-shadow 0.3s;
    }
    .ksu__cta:hover { transform: translateY(-2px); box-shadow: 0 16px 34px -14px var(--gold-400); }
    .ksu__cta:focus-visible { outline-color: var(--gold-400); }

    /* ---- Stacking role cards ---- */
    .steps { list-style: none; margin: 36px 0 0; padding: 0; display: grid; gap: 28px; }
    .step {
      position: sticky;
      top: calc(var(--nav-h) + 18px + var(--i) * 16px);
    }
    .card {
      --mx: 50%;
      --my: 0%;
      position: relative;
      overflow: hidden;
      padding: clamp(20px, 3.5vw, 34px);
      border-radius: var(--radius-m);
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
    }
    .card::after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(360px circle at var(--mx) var(--my), color-mix(in srgb, var(--accent) 14%, transparent), transparent 60%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .card:hover::after { opacity: 1; }
    .card > :not(.card__year) { position: relative; }
    .card__year {
      position: absolute;
      inset-block-start: 6px;
      inset-inline-end: 0.3em;
      font-size: clamp(5rem, 14vw, 9rem);
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.04em;
      color: var(--text);
      opacity: 0.05;
      user-select: none;
      pointer-events: none;
    }
    .card--ksu { border-color: color-mix(in srgb, var(--gold-400) 55%, var(--border)); }
    .card--ksu::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 2px;
      pointer-events: none;
      background: conic-gradient(from var(--a), var(--gold-400), transparent 28%, var(--accent) 55%, transparent 78%, var(--gold-400));
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
      animation: spin 7s linear infinite;
    }
    @keyframes spin { to { --a: 360deg; } }
    .card__top { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; }
    .card__period { margin: 0; display: flex; align-items: center; color: var(--accent-2); font-weight: 700; font-size: 0.95rem; letter-spacing: 0.02em; }
    .card__ksu {
      padding: 3px 12px;
      border-radius: 999px;
      background: var(--gold-400);
      color: var(--navy-900);
      font-size: 0.8rem;
      font-weight: 800;
    }
    .card__role { margin-top: 30px; font-size: clamp(1.25rem, 2.6vw, 1.6rem); }
    .card__company { margin: 4px 0 0; font-weight: 600; }
    .card__context { color: var(--text-muted); font-weight: 400; }
    .card__summary { margin: 12px 0 0; max-width: 46em; color: var(--text-muted); }
    @media (max-width: 700px) {
      .step { top: calc(var(--nav-h) + 12px + var(--i) * 10px); }
    }
  `,
})
export class Experience {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly ksu = computed(() => this.t().experience.ksu);

  protected readonly since = computed(() =>
    new Intl.DateTimeFormat(this.i18n.dateLocale(), { month: 'short', year: 'numeric' }).format(new Date(2023, 1, 1)),
  );

  protected readonly jobs = computed(() => {
    const fmt = new Intl.DateTimeFormat(this.i18n.dateLocale(), { month: 'short', year: 'numeric' });
    const parse = (ym: string) => {
      const [y, m] = ym.split('-').map(Number);
      return fmt.format(new Date(y, m - 1, 1));
    };
    return JOBS.map((j) => ({
      id: j.id,
      company: j.company,
      current: j.to === null,
      ksu: !!j.ksu,
      year: j.from.slice(0, 4),
      role: this.i18n.pick(j.role),
      context: j.context ? this.i18n.pick(j.context) : null,
      summary: this.i18n.pick(j.summary),
      period: `${parse(j.from)} – ${j.to ? parse(j.to) : this.t().experience.present}`,
    }));
  });
}
