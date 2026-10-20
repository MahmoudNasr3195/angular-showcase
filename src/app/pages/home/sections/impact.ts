import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { impactStats } from '../../../core/cv-data';
import { I18nService } from '../../../core/i18n/i18n.service';
import { CountUp } from '../../../shared/count-up';
import { Reveal } from '../../../shared/reveal.directive';

@Component({
  selector: 'app-impact',
  imports: [CountUp, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container impact" [attr.aria-label]="i18n.t().impact.label">
      <ul class="impact__grid">
        @for (s of stats; track $index) {
          <li class="impact__item" [appReveal]="$index * 90">
            <strong class="impact__value"><app-count-up [value]="s.value" [suffix]="s.suffix" /></strong>
            <span class="impact__label">{{ i18n.pick(s.label) }}</span>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    .impact { padding-block: 8px 24px; }
    .impact__grid {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1px;
      background: var(--border);
      border: 1px solid var(--border);
      border-radius: var(--radius-m);
      overflow: hidden;
    }
    .impact__item {
      background: var(--bg-elevated);
      padding: 26px 22px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .impact__value {
      font-size: clamp(2.2rem, 4.4vw, 3.2rem);
      line-height: 1;
      font-weight: 800;
      color: var(--accent);
    }
    .impact__label { color: var(--text-muted); font-size: 0.98rem; }
    @media (max-width: 760px) {
      .impact__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
  `,
})
export class Impact {
  protected readonly i18n = inject(I18nService);
  protected readonly stats = impactStats();
}
