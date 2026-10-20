import { Lang } from './i18n/dictionary';
import { SITE } from './site.config';

/**
 * JSON-LD (schema.org) for each page. Every value here must match what the visible page and the CV say.
 * Deliberately NOT included: birthdate, nationality, marital status, phone number.
 * No Review / AggregateRating markup (self-serving reviews are not eligible).
 */

const ID = {
  person: `${SITE.domain}/#person`,
  website: `${SITE.domain}/#website`,
};

const NAME: Record<Lang, string> = { en: SITE.personName, ar: 'محمود إبراهيم نصر' };

const JOB_TITLE: Record<Lang, string> = {
  en: 'Senior Frontend Engineer (Angular)',
  ar: 'مهندس واجهات أمامية أول (Angular)',
};

const KNOWS_ABOUT = [
  'Angular',
  'TypeScript',
  'RxJS',
  'NgRx',
  'Micro-frontends',
  'Native Federation',
  'Module Federation',
  'Progressive Web Apps',
  'Power BI embedded',
  'Frontend architecture',
  'Responsive web design',
];

function url(lang: Lang, path: string): string {
  // Trailing slash to match the canonical URLs (the host redirects /en to /en/).
  return `${SITE.domain}/${lang}/${path ? path + '/' : ''}`;
}

function person(lang: Lang) {
  return {
    '@type': 'Person',
    '@id': ID.person,
    name: NAME[lang],
    alternateName: NAME[lang === 'en' ? 'ar' : 'en'],
    url: url(lang, ''),
    image: `${SITE.domain}/og/og-${lang}.jpg`,
    email: SITE.email,
    jobTitle: JOB_TITLE[lang],
    worksFor: { '@type': 'Organization', name: 'Knowledge Developers' },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: lang === 'ar' ? 'جامعة بنها' : 'Benha University' },
      { '@type': 'EducationalOrganization', name: lang === 'ar' ? 'أكاديمية روت' : 'Route Academy' },
    ],
    address: { '@type': 'PostalAddress', addressLocality: lang === 'ar' ? 'الرياض' : 'Riyadh', addressCountry: 'SA' },
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: ['ar', 'en'],
    sameAs: [SITE.linkedin, SITE.github],
  };
}

function website() {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: SITE.domain,
    name: `${SITE.personName} | ${NAME.ar}`,
    inLanguage: ['en', 'ar'],
    publisher: { '@id': ID.person },
  };
}

function breadcrumbs(lang: Lang, items: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: url(lang, item.path),
    })),
  };
}

/** Home: the CV page. ProfilePage -> Person is the entity Google and AI answer engines read. */
export function homeStructuredData(lang: Lang, title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      website(),
      person(lang),
      {
        '@type': 'ProfilePage',
        '@id': `${url(lang, '')}#profile`,
        url: url(lang, ''),
        name: title,
        description,
        inLanguage: lang,
        isPartOf: { '@id': ID.website },
        mainEntity: { '@id': ID.person },
      },
      breadcrumbs(lang, [{ name: lang === 'ar' ? 'الرئيسية' : 'Home', path: '' }]),
    ],
  };
}
