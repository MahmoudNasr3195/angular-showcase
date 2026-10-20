import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EXPERTISE } from '../../../core/cv-data';
import { I18nService } from '../../../core/i18n/i18n.service';
import { Reveal } from '../../../shared/reveal.directive';
import { HairlineFigure } from '../../../shared/hairline-figure';
import { Spotlight } from '../../../shared/spotlight.directive';

@Component({
  selector: 'app-expertise',
  imports: [Reveal, Spotlight, HairlineFigure],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="expertise" class="section container" aria-labelledby="expertise-title">
      <div class="headrow">
        <header class="section__head" appReveal>
          <p class="section__eyebrow">{{ t().expertise.eyebrow }}</p>
          <h2 id="expertise-title" class="section__title">{{ t().expertise.title }}</h2>
          <p class="section__intro">{{ t().expertise.intro }}</p>
        </header>
        <div class="headrow__figure" appReveal aria-hidden="true">
          @defer (on viewport) {
            <app-hairline figure="exploded" />
          } @placeholder {
            <div class="headrow__ph"></div>
          }
        </div>
      </div>

      <ul class="cards">
        @for (e of items; track e.id) {
          <li class="card" appSpotlight [appReveal]="($index % 3) * 100">
            <span class="card__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26"><path [attr.d]="e.icon" fill="currentColor" /></svg>
            </span>
            <h3 class="card__title">{{ i18n.pick(e.title) }}</h3>
            <p class="card__text">{{ i18n.pick(e.text) }}</p>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    .cards {
      list-style: none;
      margin: 40px 0 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }
    .card {
      position: relative;
      padding: 28px;
      border-radius: var(--radius-m);
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      overflow: hidden;
      isolation: isolate;
      transition: border-color 0.3s, transform 0.4s var(--ease-out);
    }
    .card::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.35s;
      background: radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%);
    }
    .card:hover { border-color: color-mix(in srgb, var(--accent) 55%, var(--border)); transform: translateY(-3px); }
    .card:hover::before { opacity: 1; }
    .card__icon {
      display: inline-grid;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: 14px;
      color: var(--accent);
      background: color-mix(in srgb, var(--accent) 12%, transparent);
    }
    .card__title { margin-top: 18px; font-size: 1.2rem; }
    .card__text { margin: 10px 0 0; color: var(--text-muted); font-size: 1rem; line-height: 1.6; }
    @media (max-width: 960px) { .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (max-width: 600px) { .cards { grid-template-columns: 1fr; } }
  `,
})
export class Expertise {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly items = EXPERTISE;
}
