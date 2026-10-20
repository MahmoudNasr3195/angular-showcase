# angular-showcase

[![CI](https://github.com/MahmoudNasr3195/angular-showcase/actions/workflows/ci.yml/badge.svg)](https://github.com/MahmoudNasr3195/angular-showcase/actions/workflows/ci.yml)

A modern Angular 22 portfolio, built to show how I structure a real, bilingual, production-minded app. It is the open version of my personal website, [mahmoudibrahimnasr.com](https://mahmoudibrahimnasr.com/en/).

## What it demonstrates

- **Modern Angular:** standalone components, signals, zoneless change detection, `@defer`, the new control flow, `OnPush` everywhere, lazy routes.
- **Arabic and English with full RTL:** language-prefixed routes (`/en`, `/ar`), `hreflang`, logical CSS properties so the layout mirrors correctly, and bidi isolation for Latin text inside Arabic.
- **Static prerender:** every route is prerendered per language (`outputMode: static`) with per-page metadata, Open Graph tags and JSON-LD (`WebSite`, `Person`, `ProfilePage`, `BreadcrumbList`).
- **Theming without a flash:** day and night themes from CSS custom properties, the first-visit default follows local time, and a View Transitions circular reveal on toggle.
- **Accessible motion:** scroll reveal, counters, an animated SVG skyline and pointer-reactive line figures all respect `prefers-reduced-motion`.
- **Content as typed data:** all copy lives in a typed dictionary that the compiler forces to stay identical in both languages, and the CV content lives in typed data files.

## Stack

Angular 22, TypeScript, SCSS design tokens (no CSS framework), Vitest. Fonts are open source (Inter and Noto Sans Arabic).

## Run it

```bash
npm install
npx ng serve      # http://localhost:4200
npx ng build      # production build -> dist/nasr-site
npx ng test       # unit tests (Vitest)
```

Requires Node >= 22.22.3 or 24.

## Structure

```
src/app/core/      i18n dictionary, CV data, SEO and structured data, theme
src/app/layout/    page shell and navigation
src/app/pages/     lazy routes
src/app/shared/    reusable pieces (reveal, count-up, spotlight, line figures)
```

## What is not here

This repository is a sanitised copy. The private parts of the live site (client work, contact details, analytics, licensed fonts, screenshots of internal systems) are not included, so a few sections fall back to simple placeholders.

## License

The code is released under the [MIT License](./LICENSE). The text, CV content, images and logo are © Mahmoud Ibrahim Nasr and are not covered by that license. Third-party credits are in [`public/third-party-notices.txt`](./public/third-party-notices.txt).
