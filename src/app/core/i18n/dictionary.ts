/**
 * All UI copy lives here, in both languages.
 * CV content (experience, systems, stack…) lives in core/cv-data.ts.
 * Keep the two objects structurally identical — `Dictionary` enforces it.
 */
export type Lang = 'en' | 'ar';
/** A string that exists in both languages. */
export type L10n = Record<Lang, string>;

const en = {
  brand: { person: 'Mahmoud Ibrahim Nasr' },
  nav: {
    contact: 'Get in touch',
    switchTo: 'العربية',
    switchLabel: 'Switch to Arabic',
    themeToLight: 'Switch to day mode',
    themeToDark: 'Switch to night mode',
    homeLabel: 'Home',
    toTop: 'Back to top',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    primary: 'Primary',
    links: {
      expertise: 'Expertise',
      experience: 'Experience',
      work: 'Selected work',
      stack: 'Stack',
      contact: 'Contact',
    },
  },
  hero: {
    greeting: 'Hello, I’m',
    name: 'Mahmoud Ibrahim Nasr',
    role: 'Senior Frontend Engineer · Angular',
    location: 'Riyadh, Saudi Arabia',
    ksuBadge: 'Building systems for King Saud University',
    tagline:
      'Any system you can describe, I can build in Angular: fast, scalable and delivered on time. And with AI in my workflow, I move faster and build stronger, better-crafted products.',
    ctaPrimary: 'Get in touch',
    ctaWork: 'See selected work',
    ctaSecondary: 'Download CV',
    sceneLabel: 'Illustration of the Riyadh skyline that changes between day and night',
  },
  impact: { label: 'Career highlights' },
  expertise: {
    eyebrow: 'What I do',
    title: 'Engineering that holds up at scale',
    intro: 'I design front-ends that stay fast, readable and easy to change as the product and the team grow.',
  },
  experience: {
    eyebrow: 'Career',
    title: 'From first commits to platform architecture',
    present: 'Present',
    ksu: {
      badge: 'King Saud University',
      eyebrow: 'Right now',
      title: 'Building the systems of King Saud University',
      text: 'Since February 2023 I have been part of the team behind the university’s core platforms: the KSU portal, Dewan, Majalis and Maham.',
      systems: 'flagship systems',
      services: 'services in the portal',
      since: 'Since',
      cta: 'See the systems',
    },
  },
  work: {
    eyebrow: 'Selected work',
    title: 'Systems I helped build',
    intro: 'Enterprise platforms for King Saud University and beyond — what each system does, and what I owned.',
    client: 'Client',
    role: 'What I owned',
    builtWith: 'Built with',
    uiDesign: 'UI design',
    screens: 'screens',
    viewScreens: 'View all screens',
    close: 'Close',
    prev: 'Previous',
    next: 'Next',
  },
  stack: {
    eyebrow: 'Toolbox',
    title: 'What I build with',
    all: 'All',
    filterLabel: 'Filter technologies by category',
  },
  education: {
    eyebrow: 'Foundation',
    title: 'Education & languages',
    languages: 'Languages',
    arabic: 'Arabic',
    arabicLevel: 'Native',
    english: 'English',
    englishLevel: 'Good — spoken and written',
  },
  contact: {
    eyebrow: 'Let’s talk',
    title: 'Have a role or a project in mind?',
    text: 'I’m happy to talk about senior Angular roles and interesting projects. Email is the fastest way to reach me.',
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    location: 'Location',
    locationValue: 'Riyadh, Saudi Arabia',
  },
  footer: { rights: 'All rights reserved.' },
  notFound: {
    title: 'Page not found',
    text: 'This page does not exist or has moved.',
    home: 'Back to the home page',
    docTitle: 'Page not found — Mahmoud Ibrahim Nasr',
  },
  meta: {
    homeTitle: 'Mahmoud Ibrahim Nasr — Senior Frontend Engineer (Angular) in Riyadh',
    homeDescription:
      'Senior Angular engineer in Riyadh building scalable web platforms and business websites. Portfolio, experience and contact.',
  },
};

const ar: Dictionary = {
  brand: { person: 'محمود إبراهيم نصر' },
  nav: {
    contact: 'تواصل معي',
    switchTo: 'English',
    switchLabel: 'التبديل إلى الإنجليزية',
    themeToLight: 'التبديل إلى الوضع النهاري',
    themeToDark: 'التبديل إلى الوضع الليلي',
    homeLabel: 'الرئيسية',
    toTop: 'العودة للأعلى',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    primary: 'التنقل الرئيسي',
    links: {
      expertise: 'الخبرات',
      experience: 'المسيرة',
      work: 'أعمال مختارة',
      stack: 'التقنيات',
      contact: 'التواصل',
    },
  },
  hero: {
    greeting: 'أهلاً، أنا',
    name: 'محمود إبراهيم نصر',
    role: 'مهندس واجهات أمامية أول · Angular',
    location: 'الرياض، المملكة العربية السعودية',
    ksuBadge: 'أبني أنظمة جامعة الملك سعود',
    tagline:
      'أي نظام تتخيّله أبنيه بـ Angular: سريع، قابل للتوسّع، ويُسلَّم في موعده. وبالذكاء الاصطناعي في طريقة شغلي أنجز أسرع وأبني منتجات أقوى وأدق في تفاصيلها.',
    ctaPrimary: 'تواصل معي',
    ctaWork: 'شاهد أعمالي',
    ctaSecondary: 'تحميل السيرة الذاتية',
    sceneLabel: 'رسم لأفق مدينة الرياض يتبدّل بين النهار والليل',
  },
  impact: { label: 'أبرز محطات المسيرة' },
  expertise: {
    eyebrow: 'ماذا أقدّم',
    title: 'هندسة تصمد مع التوسّع',
    intro: 'أصمّم واجهات تبقى سريعة وواضحة وسهلة التعديل مع نموّ المنتج والفريق.',
  },
  experience: {
    eyebrow: 'المسيرة',
    title: 'من أول سطر برمجي إلى هندسة المنصات',
    present: 'الآن',
    ksu: {
      badge: 'جامعة الملك سعود',
      eyebrow: 'الآن',
      title: 'أبني أنظمة جامعة الملك سعود',
      text: 'منذ فبراير 2023 وأنا جزء من الفريق الذي يبني المنصات الأساسية في الجامعة: بوابة الجامعة وديوان ومجالس ومهام.',
      systems: 'أنظمة رئيسية',
      services: 'خدمة في البوابة',
      since: 'منذ',
      cta: 'شاهد الأنظمة',
    },
  },
  work: {
    eyebrow: 'أعمال مختارة',
    title: 'أنظمة شاركت في بنائها',
    intro: 'منصات مؤسسية لجامعة الملك سعود وغيرها — ماذا يفعل كل نظام، وما الذي كنت مسؤولاً عنه.',
    client: 'العميل',
    role: 'مسؤولياتي',
    builtWith: 'التقنيات المستخدمة',
    uiDesign: 'تصميم واجهة',
    screens: 'شاشات',
    viewScreens: 'عرض كل الشاشات',
    close: 'إغلاق',
    prev: 'السابق',
    next: 'التالي',
  },
  stack: {
    eyebrow: 'الأدوات',
    title: 'ما أبني به',
    all: 'الكل',
    filterLabel: 'تصفية التقنيات حسب الفئة',
  },
  education: {
    eyebrow: 'الأساس',
    title: 'التعليم واللغات',
    languages: 'اللغات',
    arabic: 'العربية',
    arabicLevel: 'اللغة الأم',
    english: 'الإنجليزية',
    englishLevel: 'جيد — تحدثاً وكتابة',
  },
  contact: {
    eyebrow: 'لنتحدث',
    title: 'عندك فرصة عمل أو مشروع؟',
    text: 'يسعدني الحديث عن وظائف Angular المتقدمة والمشاريع المميزة. البريد الإلكتروني أسرع طريقة للوصول إليّ.',
    email: 'البريد الإلكتروني',
    linkedin: 'لينكدإن',
    github: 'جيت هب',
    location: 'الموقع',
    locationValue: 'الرياض، المملكة العربية السعودية',
  },
  footer: { rights: 'جميع الحقوق محفوظة.' },
  notFound: {
    title: 'الصفحة غير موجودة',
    text: 'هذه الصفحة غير موجودة أو تم نقلها.',
    home: 'العودة إلى الصفحة الرئيسية',
    docTitle: 'الصفحة غير موجودة — محمود إبراهيم نصر',
  },
  meta: {
    homeTitle: 'محمود إبراهيم نصر — مهندس واجهات أمامية أول (Angular) في الرياض',
    homeDescription:
      'مهندس Angular أول في الرياض، أبني منصات ويب قابلة للتوسّع ومواقع للشركات. الأعمال والخبرات والتواصل.',
  },
};

export type Dictionary = typeof en;

export const DICTIONARY: Record<Lang, Dictionary> = { en, ar };
