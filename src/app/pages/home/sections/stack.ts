import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { STACK, StackGroupId } from '../../../core/cv-data';
import { I18nService } from '../../../core/i18n/i18n.service';
import { Reveal } from '../../../shared/reveal.directive';

type Filter = 'all' | StackGroupId;

@Component({
  selector: 'app-stack',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="stack" class="section container" aria-labelledby="stack-title">
      <header class="section__head" appReveal>
        <p class="section__eyebrow">{{ t().stack.eyebrow }}</p>
        <h2 id="stack-title" class="section__title">{{ t().stack.title }}</h2>
      </header>

      <div class="filters" role="group" [attr.aria-label]="t().stack.filterLabel" appReveal>
        <button type="button" class="filter" [attr.aria-pressed]="active() === 'all'" (click)="active.set('all')">
          {{ t().stack.all }}
        </button>
        @for (g of groups; track g.id) {
          <button type="button" class="filter" [attr.aria-pressed]="active() === g.id" (click)="active.set(g.id)">
            {{ i18n.pick(g.label) }}
          </button>
        }
      </div>

      <div class="groups">
        @for (g of visible(); track g.id) {
          <div class="group">
            <h3 class="group__label">{{ i18n.pick(g.label) }}</h3>
            <ul class="chips">
              @for (item of g.items; track item; let i = $index) {
                <li class="chip" dir="ltr" [style.--i]="i">{{ item }}</li>
              }
            </ul>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .filters { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
    .filter {
      appearance: none;
      font: inherit;
      font-weight: 600;
      font-size: 0.95rem;
      min-height: 44px;
      padding: 0 20px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: transparent;
      color: var(--text);
      cursor: pointer;
      transition: background 0.25s, color 0.25s, border-color 0.25s;
    }
    .filter:hover { border-color: var(--accent); }
    .filter[aria-pressed='true'] { background: var(--accent); color: var(--accent-contrast); border-color: var(--accent); }
    .groups { display: grid; gap: 30px; margin-top: 34px; }
    .group__label { font-size: 1rem; color: var(--text-muted); font-weight: 600; }
    .chips { list-style: none; margin: 14px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
    .chip {
      padding: 9px 18px;
      border-radius: var(--radius-s);
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      font-weight: 600;
      animation: chip-in 0.5s var(--ease-out) backwards;
      animation-delay: calc(var(--i) * 45ms);
      transition: border-color 0.25s, transform 0.3s var(--ease-out);
    }
    .chip:hover { border-color: var(--accent); transform: translateY(-2px); }
    @keyframes chip-in { from { opacity: 0; transform: translateY(10px) scale(0.96); } to { opacity: 1; transform: none; } }
  `,
})
export class Stack {
  protected readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly groups = STACK;
  protected readonly active = signal<Filter>('all');
  protected readonly visible = computed(() => (this.active() === 'all' ? STACK : STACK.filter((g) => g.id === this.active())));
}
