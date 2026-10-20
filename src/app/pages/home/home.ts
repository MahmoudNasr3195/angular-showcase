import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { homeStructuredData } from '../../core/structured-data';
import { I18nService } from '../../core/i18n/i18n.service';
import { Hero } from './hero';
import { Contact } from './sections/contact';
import { Education } from './sections/education';
import { Experience } from './sections/experience';
import { Expertise } from './sections/expertise';
import { Impact } from './sections/impact';
import { Stack } from './sections/stack';
import { Work } from './sections/work';

@Component({
  selector: 'app-home',
  imports: [Hero, Impact, Expertise, Experience, Work, Stack, Education, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-impact />
    <app-expertise />
    <app-experience />
    <app-work />
    <app-stack />
    <app-education />
    <app-contact />
  `,
})
export class Home {
  constructor() {
    const i18n = inject(I18nService);
    const seo = inject(SeoService);
    effect(() => {
      const t = i18n.t().meta;
      seo.set({
        path: '',
        title: t.homeTitle,
        description: t.homeDescription,
        jsonLd: homeStructuredData(i18n.lang(), t.homeTitle, t.homeDescription),
      });
    });
  }
}
