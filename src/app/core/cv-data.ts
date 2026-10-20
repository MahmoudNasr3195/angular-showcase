import { L10n } from './i18n/dictionary';

/**
 * Structured CV content, bilingual. Source: the owner's CV (PDF) — keep every claim traceable to it.
 * Deliberately NOT included (private): birthdate, marital status, nationality, phone number.
 */

const START_SOFTWARE = new Date(2018, 1, 1); // Feb 2018 — Junior Software Engineer
const START_FRONTEND = new Date(2020, 9, 1); // Oct 2020 — first front-end role

function yearsSince(start: Date, now = new Date()): number {
  return Math.floor((now.getTime() - start.getTime()) / (365.25 * 24 * 3600 * 1000));
}

/** Whole years in software and in front-end, computed from the start dates. */
export function careerYears(now = new Date()): { software: number; frontend: number } {
  return { software: yearsSince(START_SOFTWARE, now), frontend: yearsSince(START_FRONTEND, now) };
}

export interface Stat {
  value: number;
  suffix: string;
  label: L10n;
}

export function impactStats(now = new Date()): Stat[] {
  return [
    {
      value: yearsSince(START_SOFTWARE, now),
      suffix: '+',
      label: { en: 'Years in software', ar: 'سنوات في البرمجة' },
    },
    {
      value: yearsSince(START_FRONTEND, now),
      suffix: '+',
      label: { en: 'Years in front-end', ar: 'سنوات في تطوير الواجهات' },
    },
    {
      value: 45,
      suffix: '+',
      label: { en: 'Services in the KSU portal', ar: 'خدمة في بوابة جامعة الملك سعود' },
    },
    {
      value: 4,
      suffix: '',
      label: { en: 'Flagship systems', ar: 'أنظمة رئيسية' },
    },
  ];
}

/* ---------------------------------------------------------------- Expertise */

export interface Expertise {
  id: string;
  /** 24×24 SVG path. */
  icon: string;
  title: L10n;
  text: L10n;
}

export const EXPERTISE: Expertise[] = [
  {
    id: 'architecture',
    icon: 'M12 2 2 7l10 5 10-5-10-5Zm0 11.5L4.5 9.7 2 11l10 5 10-5-2.5-1.3L12 13.5Zm0 4L4.5 13.7 2 15l10 5 10-5-2.5-1.3L12 17.5Z',
    title: { en: 'Angular architecture', ar: 'هندسة Angular' },
    text: {
      en: 'Modular, maintainable and scalable Angular applications, from the first folder structure to large multi-team codebases.',
      ar: 'تطبيقات Angular مقسّمة إلى وحدات، سهلة الصيانة وقابلة للتوسّع، من أول هيكل للمجلدات حتى قواعد الكود الكبيرة متعددة الفرق.',
    },
  },
  {
    id: 'state',
    icon: 'M17 1l4 4-4 4V6H7a3 3 0 0 0-3 3v1H2V9a5 5 0 0 1 5-5h10V1Zm-10 22-4-4 4-4v3h10a3 3 0 0 0 3-3v-1h2v1a5 5 0 0 1-5 5H7v3Z',
    title: { en: 'Reactive state management', ar: 'إدارة الحالة التفاعلية' },
    text: {
      en: 'RxJS and NgRx to keep application state predictable, which means fewer bugs and a smoother experience for users.',
      ar: 'RxJS وNgRx لجعل حالة التطبيق متوقَّعة، وبالتالي أخطاء أقل وتجربة أسلس للمستخدم.',
    },
  },
  {
    id: 'performance',
    icon: 'M13 2 4 14h6l-1 8 9-12h-6l1-8Z',
    title: { en: 'Performance', ar: 'الأداء' },
    text: {
      en: 'Finding and fixing bottlenecks: lazy loading, change-detection strategies and smaller bundles.',
      ar: 'اكتشاف مشكلات الأداء وحلّها: التحميل الكسول، استراتيجيات كشف التغيير، وتصغير حجم الحزم.',
    },
  },
  {
    id: 'components',
    icon: 'M3 3h8v8H3V3Zm10 0h8v8h-8V3ZM3 13h8v8H3v-8Zm10 0h8v8h-8v-8Z',
    title: { en: 'Reusable components', ar: 'مكوّنات قابلة لإعادة الاستخدام' },
    text: {
      en: 'Dynamic, reusable components and design-system thinking (Angular Material) so teams ship consistent UI faster.',
      ar: 'مكوّنات ديناميكية قابلة لإعادة الاستخدام وتفكير نظام تصميم (Angular Material) ليُنجز الفريق واجهات متسقة بشكل أسرع.',
    },
  },
  {
    id: 'leadership',
    icon: 'M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5C15 14.2 10.3 13 8 13Zm8 0c-.3 0-.6 0-1 .1 1.2.8 2 1.9 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5Z',
    title: { en: 'Leadership & code quality', ar: 'القيادة وجودة الكود' },
    text: {
      en: 'Code reviews, mentoring developers, clean-code standards, close work with clients, back end, UI/UX and QA, and CI/CD with GitHub Actions.',
      ar: 'مراجعات الكود، وتوجيه المطورين، ومعايير الكود النظيف، والعمل الوثيق مع العملاء والباك إند وUI/UX والجودة، وCI/CD عبر GitHub Actions.',
    },
  },
  {
    id: 'ai',
    icon: 'M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2Zm7 12 1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1 1-2.6Z',
    title: { en: 'AI-accelerated engineering', ar: 'هندسة مُسرَّعة بالذكاء الاصطناعي' },
    text: {
      en: 'I put AI to work across the whole cycle — UI design, test generation, code review and faster task delivery — to ship stronger products at a quicker pace.',
      ar: 'أُطوّع الذكاء الاصطناعي في دورة العمل كلها: تطوير التصميم، وتوليد الاختبارات، ومراجعة الكود، وتسليم المهام بسرعة — لأبني منتجات أقوى بوتيرة أسرع.',
    },
  },
];

/* --------------------------------------------------------------- Experience */

export interface Job {
  id: string;
  role: L10n;
  company: string;
  /** Extra line under the company, e.g. where the work happened. */
  context?: L10n;
  /** 'YYYY-MM' */
  from: string;
  /** 'YYYY-MM', or null for the current role. */
  to: string | null;
  summary: L10n;
  /** Work done on King Saud University projects (highlighted on the site). */
  ksu?: boolean;
}

/** Newest first. Knowledge Developers appears twice: the owner left for 2P in between. */
export const JOBS: Job[] = [
  {
    id: 'kd-senior',
    ksu: true,
    role: { en: 'Senior Frontend Developer', ar: 'مطوّر واجهات أمامية أول' },
    company: 'Knowledge Developers',
    context: { en: 'Embedded in King Saud University projects', ar: 'ضمن مشاريع جامعة الملك سعود' },
    from: '2025-01',
    to: null,
    summary: {
      en: 'Lead the Angular architecture and development of the KSU portal and the Dewan system, gather requirements with university stakeholders, mentor developers, review code, and use AI to speed up design, testing and delivery.',
      ar: 'أقود هندسة وتطوير Angular لبوابة جامعة الملك سعود ونظام ديوان، وأجمع المتطلبات مع أصحاب المصلحة في الجامعة، وأوجّه المطورين وأراجع الكود، وأوظّف الذكاء الاصطناعي لتسريع التصميم والاختبار والتسليم.',
    },
  },
  {
    id: '2p',
    role: { en: 'Mid-Senior Angular Developer', ar: 'مطوّر Angular متوسط–أول' },
    company: '2P Perfect Presentation',
    from: '2024-07',
    to: '2025-01',
    summary: {
      en: 'Built the front end of the Maham task-tracking system: Adobe XD designs turned into responsive, cross-browser interfaces.',
      ar: 'بنيت الواجهة الأمامية لنظام «مهام» لمتابعة المهام: تحويل تصاميم Adobe XD إلى واجهات متجاوبة تعمل على مختلف المتصفحات.',
    },
  },
  {
    id: 'kd-junior',
    ksu: true,
    role: { en: 'Junior Angular Developer', ar: 'مطوّر Angular مبتدئ' },
    company: 'Knowledge Developers',
    context: { en: 'King Saud University programme', ar: 'برنامج جامعة الملك سعود' },
    from: '2023-02',
    to: '2024-07',
    summary: {
      en: 'Joined the KSU programme and worked on its large systems: the KSU portal, Dewan and Majalis.',
      ar: 'انضممت إلى برنامج جامعة الملك سعود وعملت على أنظمته الكبيرة: البوابة وديوان ومجالس.',
    },
  },
  {
    id: 'ice',
    role: { en: 'Front-End Web Developer', ar: 'مطوّر واجهات أمامية للويب' },
    company: 'ICE Group',
    from: '2021-06',
    to: '2022-08',
    summary: {
      en: 'Front-end development of web applications.',
      ar: 'تطوير واجهات أمامية لتطبيقات الويب.',
    },
  },
  {
    id: 'quna',
    role: { en: 'Junior Front-End Developer', ar: 'مطوّر واجهات أمامية مبتدئ' },
    company: 'Quna360',
    from: '2020-10',
    to: '2021-06',
    summary: {
      en: 'First dedicated front-end role: building web interfaces.',
      ar: 'أول وظيفة متخصصة في الواجهات الأمامية: بناء واجهات الويب.',
    },
  },
  {
    id: 'crazy',
    role: { en: 'Junior Software Engineer', ar: 'مهندس برمجيات مبتدئ' },
    company: 'Crazy Contracting Co.',
    from: '2018-02',
    to: '2020-09',
    summary: {
      en: 'Where the career began: software engineering fundamentals.',
      ar: 'بداية المشوار: أساسيات هندسة البرمجيات.',
    },
  },
];

/* -------------------------------------------------------------- Flagship work */

export interface System {
  id: string;
  name: L10n;
  client: L10n;
  summary: L10n;
  role: L10n[];
  tags: string[];
  /** Path under /public, e.g. 'work/ksu-portal.webp'. Omit until a (masked) screenshot exists. */
  screenshot?: string;
  /** UI design screens shown in the lightbox (first one should match `screenshot`). Masked of personal data. */
  gallery?: Shot[];
}

export interface Shot {
  src: string;
  caption: L10n;
}

export const SYSTEMS: System[] = [
  {
    id: 'ksu-portal',
    name: { en: 'KSU Portal', ar: 'بوابة جامعة الملك سعود' },
    client: { en: 'King Saud University · via Knowledge Developers', ar: 'جامعة الملك سعود · عبر Knowledge Developers' },
    summary: {
      en: 'A workflow-management platform with 45+ services. Started as an N-Tier system and was rebuilt as microservices on .NET 10 with an Angular 21 front end.',
      ar: 'منصة لإدارة سير العمل تضم أكثر من 45 خدمة. بدأت بمعمارية N-Tier ثم أُعيد بناؤها كخدمات مصغّرة على \u2066.NET 10\u2069 مع واجهة Angular 21.',
    },
    role: [
      {
        en: 'Gathered requirements with KSU business clients and wrote them up as an SRS.',
        ar: 'جمعت المتطلبات مع عملاء الجامعة وصغتها في وثيقة SRS.',
      },
      {
        en: 'Led the Angular architecture: modular, maintainable, scalable.',
        ar: 'قدت هندسة Angular: وحدات منظمة وقابلة للصيانة والتوسّع.',
      },
      {
        en: 'Built reusable, dynamic components and managed state with RxJS.',
        ar: 'بنيت مكوّنات ديناميكية قابلة لإعادة الاستخدام وأدرت الحالة عبر RxJS.',
      },
      {
        en: 'Fixed performance bottlenecks: lazy loading, change detection, bundle size.',
        ar: 'عالجت اختناقات الأداء: التحميل الكسول وكشف التغيير وحجم الحزم.',
      },
      {
        en: 'Split the front end into micro-frontends with Native Federation, and embedded Power BI dashboards and charts.',
        ar: 'قسّمت الواجهة إلى واجهات مصغّرة عبر Native Federation، ودمجت لوحات Power BI والرسوم البيانية.',
      },
      {
        en: 'Secured sign-in with OAuth/OIDC, added monitoring with Application Insights, and pinned vulnerable dependencies to safe versions.',
        ar: 'أمّنت تسجيل الدخول عبر OAuth/OIDC، وأضفت المراقبة بـ Application Insights، وثبّتّ الحزم المعرّضة للثغرات على إصدارات آمنة.',
      },
      {
        en: 'Mentored juniors, ran code reviews and wired Angular builds into CI/CD with GitHub Actions.',
        ar: 'وجّهت المبتدئين وأجريت مراجعات الكود وربطت بناء Angular بـ CI/CD عبر GitHub Actions.',
      },
    ],
    tags: ['Angular 21', 'RxJS', 'TypeScript', 'Native Federation', 'Power BI', '.NET 10', 'GitHub Actions', 'AI-assisted dev'],
  },
  {
    id: 'dewan',
    name: { en: 'Dewan', ar: 'ديوان' },
    client: { en: 'King Saud University · administrative communications', ar: 'جامعة الملك سعود · المراسلات الإدارية' },
    summary: {
      en: 'The university’s administrative-communications system: it shortens the time transactions take to move between offices and protects documents from damage or loss.',
      ar: 'نظام المراسلات الإدارية في الجامعة: يختصر الوقت الذي تستغرقه المعاملات للانتقال بين الجهات ويحمي المستندات من التلف والفقد.',
    },
    role: [
      {
        en: 'The whole front end was my responsibility, from receiving the UI/UX designs to final delivery.',
        ar: 'الواجهة الأمامية كاملة كانت مسؤوليتي، من استلام تصاميم UI/UX حتى التسليم.',
      },
      {
        en: 'Set up the project structure, SSO sign-in and Module Federation, and connected it all to the back end.',
        ar: 'أسّست هيكل المشروع وتسجيل الدخول الموحّد (SSO) وModule Federation، وربطتها بالباك إند.',
      },
      {
        en: 'Built the business features with clean, organised code, down to details like PWA, document scanning, PDF tools and QR/barcodes, and delivered on time.',
        ar: 'نفّذت وظائف العمل بكود منظّم وقوي حتى تفاصيل مثل PWA والمسح الضوئي وأدوات PDF وQR والباركود، وسلّمت في الموعد.',
      },
    ],
    tags: ['Angular 18', 'RxJS', 'TypeScript', 'Module Federation', 'SSO', 'PWA'],
  },
  {
    id: 'majalis',
    name: { en: 'Majalis', ar: 'مجالس' },
    client: { en: 'King Saud University · meetings', ar: 'جامعة الملك سعود · الاجتماعات' },
    summary: {
      en: 'An electronic system that manages meetings end to end and lets members communicate without copying documents around.',
      ar: 'نظام إلكتروني يدير الاجتماعات بالكامل ويسهّل التواصل بين الأعضاء دون تداول نسخ المستندات.',
    },
    role: [
      {
        en: 'Built responsive, interactive views in HTML5, CSS3 and JavaScript, integrated with the MVC back end over REST.',
        ar: 'بنيت واجهات تفاعلية متجاوبة بـ HTML5 وCSS3 وJavaScript وربطتها بخلفية MVC عبر REST.',
      },
      {
        en: 'My main role: moving the old interface to the new design, turning the XD files and the previous look into HTML and CSS templates, with View and Controller kept cleanly separated.',
        ar: 'دوري الأكبر: نقل الواجهة القديمة إلى التصميم الجديد، بتحويل ملفات XD والشكل السابق إلى قوالب HTML وCSS مع فصل واضح بين العرض والتحكم.',
      },
      {
        en: 'Cut render-blocking resources and built reusable UI components.',
        ar: 'قلّلت الموارد المعطِّلة للعرض وبنيت مكوّنات واجهة قابلة لإعادة الاستخدام.',
      },
    ],
    tags: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'MVC', 'REST'],
  },
  {
    id: 'maham',
    name: { en: 'Maham', ar: 'مهام' },
    client: {
      en: '2P Perfect Presentation, and King Saud University edition · task tracking',
      ar: '2P Perfect Presentation، ونسخة جامعة الملك سعود · متابعة المهام',
    },
    summary: {
      en: 'A task-tracking system that organises the work users perform and makes supervising tasks and acting on them easier. The same design also runs as a separate edition with the university’s identity, which I keep improving.',
      ar: 'نظام لمتابعة المهام ينظّم أعمال المستخدمين ويسهّل الإشراف على المهام واتخاذ الإجراءات. ويعمل التصميم نفسه كنسخة مستقلة بهوية الجامعة، وما زلت أطوّرها.',
    },
    role: [
      {
        en: 'My main role: translated the Adobe XD files into fully responsive HTML and CSS.',
        ar: 'دوري الأكبر: تحويل ملفات Adobe XD إلى HTML وCSS متجاوبة بالكامل.',
      },
      {
        en: 'Worked with the design team so the build matched the visual intent.',
        ar: 'عملت مع فريق التصميم ليطابق التنفيذ الرؤية البصرية.',
      },
      {
        en: 'Ensured cross-browser compatibility, then tested and debugged the interfaces.',
        ar: 'ضمنت التوافق بين المتصفحات ثم اختبرت الواجهات وصحّحت أخطاءها.',
      },
    ],
    tags: ['HTML5', 'CSS3', 'Bootstrap', 'Adobe XD', 'Responsive design'],
  },
];

/* -------------------------------------------------------------------- Stack */

export type StackGroupId = 'frontend' | 'languages' | 'ui' | 'data' | 'tooling';

export interface StackGroup {
  id: StackGroupId;
  label: L10n;
  items: string[];
}

export const STACK: StackGroup[] = [
  {
    id: 'frontend',
    label: { en: 'Framework & state', ar: 'الإطار وإدارة الحالة' },
    items: ['Angular', 'RxJS', 'NgRx', 'Module Federation', 'Native Federation', 'PWA', 'Reactive programming'],
  },
  {
    id: 'languages',
    label: { en: 'Languages', ar: 'اللغات' },
    items: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Sass'],
  },
  {
    id: 'ui',
    label: { en: 'UI & design', ar: 'الواجهات والتصميم' },
    items: ['Angular Material', 'PrimeNG', 'Tailwind CSS', 'Bootstrap', 'Responsive design', 'Design systems'],
  },
  {
    id: 'data',
    label: { en: 'Data & integrations', ar: 'البيانات والتكاملات' },
    items: ['Power BI embedded', 'Chart.js', 'ApexCharts', 'Google Maps', 'Hijri calendar', 'PDF & document scanning'],
  },
  {
    id: 'tooling',
    label: { en: 'Tooling & delivery', ar: 'الأدوات والتسليم' },
    items: ['Git', 'GitHub', 'GitHub Actions', 'CI/CD', 'NPM', 'Unit testing', 'REST APIs', 'OAuth / OIDC', 'Application Insights', 'ESLint'],
  },
];

/* ---------------------------------------------------------------- Education */

export interface Education {
  id: string;
  title: L10n;
  place: L10n;
  period: L10n;
  note?: L10n;
}

export const EDUCATION: Education[] = [
  {
    id: 'benha',
    title: { en: 'B.Sc. Computers & Information — Computer Science', ar: 'بكالوريوس الحاسبات والمعلومات — علوم الحاسب' },
    place: { en: 'Benha University', ar: 'جامعة بنها' },
    period: { en: '2013 – 2017', ar: '2013 – 2017' },
    note: { en: 'Graduation project: Excellent', ar: 'تقدير مشروع التخرج: امتياز' },
  },
  {
    id: 'route',
    title: {
      en: 'Professional Front-End Web Development Diploma',
      ar: 'دبلومة احترافية في تطوير واجهات الويب',
    },
    place: { en: 'Route Academy', ar: 'أكاديمية روت' },
    period: { en: 'Sep 2023 – Mar 2024', ar: 'سبتمبر 2023 – مارس 2024' },
    note: { en: '6-month system-development diploma', ar: 'دبلومة تطوير الأنظمة لمدة 6 أشهر' },
  },
];
