import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SITE } from '../../../core/site.config';
import { Reveal } from '../../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="section container" aria-labelledby="contact-title">
      <div class="panel" appReveal>
        <p class="panel__eyebrow">{{ t().contact.eyebrow }}</p>
        <h2 id="contact-title" class="panel__title">{{ t().contact.title }}</h2>
        <p class="panel__text">{{ t().contact.text }}</p>

        <a class="panel__cta" [href]="'mailto:' + site.email">{{ site.email }}</a>

        <ul class="links">
          <li><a [href]="site.linkedin" target="_blank" rel="noopener me">{{ t().contact.linkedin }}</a></li>
          <li><a [href]="site.github" target="_blank" rel="noopener me">{{ t().contact.github }}</a></li>
          <li class="links__static">{{ t().contact.location }}: {{ t().contact.locationValue }}</li>
        </ul>
      </div>
    </section>
  `,
  styles: `
    /* Dark navy in both themes by design — uses brand tokens that don't change with the theme. */
    .panel {
      padding: clamp(28px, 6vw, 72px);
      border-radius: var(--radius-l);
      color: var(--on-navy);
      background:
        radial-gradient(600px circle at 90% 0%, color-mix(in srgb, var(--gold-400) 22%, transparent), transparent 60%),
        linear-gradient(140deg, var(--navy-900), var(--navy-700));
    }
    .panel__eyebrow { margin: 0; color: var(--gold-400); font-weight: 700; }
    .panel__title { margin-top: 8px; font-size: clamp(1.9rem, 4.4vw, 3rem); }
    .panel__text { margin: 14px 0 0; max-width: 36em; color: var(--on-navy-muted); font-size: 1.1rem; }
    .panel__cta {
      display: inline-flex;
      margin-top: 28px;
      min-height: 52px;
      align-items: center;
      padding: 0 28px;
      border-radius: 999px;
      background: var(--gold-400);
      color: var(--navy-900);
      font-weight: 800;
      text-decoration: none;
      transition: transform 0.3s var(--ease-out), box-shadow 0.3s;
      overflow-wrap: anywhere;
    }
    .panel__cta:hover { transform: translateY(-2px); box-shadow: 0 16px 34px -14px var(--gold-400); }
    .panel__cta:focus-visible, .links a:focus-visible { outline-color: var(--gold-400); }
    .links { list-style: none; margin: 26px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px 26px; }
    .links a { color: var(--on-navy); font-weight: 600; text-underline-offset: 4px; }
    .links a:hover { color: var(--gold-400); }
    .links__static { color: var(--on-navy-muted); }
  `,
})
export class Contact {
  protected readonly t = inject(I18nService).t;
  protected readonly site = SITE;
}
