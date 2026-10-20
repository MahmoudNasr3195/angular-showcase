/** Single source of truth for public contact / identity details. */
export const SITE = {
  domain: 'https://mahmoudibrahimnasr.com',
  personName: 'Mahmoud Ibrahim Nasr',
  email: 'nasrmahmoud225@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mahmoudibrahim3195/',
  github: 'https://github.com/MahmoudNasr3195',
  /** CV download links point at the live site; the PDFs are not part of this repository. */
  cvPath: {
    en: 'https://mahmoudibrahimnasr.com/cv/Mahmoud-Ibrahim-Nasr-CV-EN.pdf',
    ar: 'https://mahmoudibrahimnasr.com/cv/Mahmoud-Ibrahim-Nasr-CV-AR.pdf',
  },
} as const;
