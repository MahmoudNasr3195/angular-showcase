import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Static site: every public page is prerendered once per language, so crawlers and link-preview bots
 * (WhatsApp, LinkedIn, X) get the right title, description and Open Graph tags without running JavaScript.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'en', renderMode: RenderMode.Prerender },
  { path: 'ar', renderMode: RenderMode.Prerender },
  { path: '404', renderMode: RenderMode.Prerender },
  // owner-only dashboard and unknown URLs stay client-rendered
  { path: '**', renderMode: RenderMode.Client },
];
