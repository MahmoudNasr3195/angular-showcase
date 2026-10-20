import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EDUCATION } from '../../../core/cv-data';
import { I18nService } from '../../../core/i18n/i18n.service';
import { Reveal } from '../../../shared/reveal.directive';

@Component({
  selector: 'app-education',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="education" class="section container" aria-labelledby="education-title">
      <header class="section__head" appReveal>
        <p class="section__eyebrow">{{ t().education.eyebrow }}</p>
        <h2 id="education-title" class="section__title">{{ t().education.title }}</h2>
      </header>

      <div class="grid">
        @for (e of items; track e.id) {
          <article class="edu" [appReveal]="$index * 100">
            <p class="edu__period">{{ i18n.pick(e.period) }}</p>
            <h3 class="edu__title">{{ i18n.pick(e.title) }}</h3>
            <p class="edu__place">{{ i18n.pick(e.place) }}</p>
            @if (e.note) {
              <p class="edu__note">{{ i18n.pick(e.note) }}</p>
            }
          </article>
        }

        <article class="edu edu--lang" appReveal="200">
          <h3 class="edu__title">{{ t().education.languages }}</h3>
          <ul class="langs">
            <li><span>{{ t().education.arabic }}</span><em>{{ t().education.arabicLevel }}</em></li>
            <li><span>{{ t().education.english }}</span><em>{{ t().education.englishLevel }}</em></li>
          </ul>
        </article>
      </div>
    </section>
  `,
  styles: `
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 40px; }
    .edu { padding: 26px; border-radius: var(--radius-m); background: var(--bg-elevated); border: 1px solid var(--border); }
    .edu__period { margin: 0; color: var(--accent-2); font-weight: 700; font-size: 0.92rem; }
    .edu__title { margin-top: 8px; font-size: 1.15rem; }
    .edu__place { margin: 8px 0 0; font-weight: 600; }
    .edu__note { margin: 6px 0 0; color: var(--text-muted); font-size: 0.95rem; }
    .langs { list-style: none; margin: 14px 0 0; padding: 0; display: grid; gap: 12px; }
    .langs li { display: flex; flex-direction: column; }
    .langs span { font-weight: 700; }
    .langs em { font-style: normal; color: var(--text-muted); font-size: 0.95rem; }
    @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
  `,
})
export class Education {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly items = EDUCATION;
}
