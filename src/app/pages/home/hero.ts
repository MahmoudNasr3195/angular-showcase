import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { SITE } from '../../core/site.config';
import { HeroAvatar } from './hero-avatar';
import { SkylineScene } from './skyline-scene';

@Component({
  selector: 'app-hero',
  imports: [SkylineScene, HeroAvatar, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__bg">
        <app-skyline-scene [label]="t().hero.sceneLabel" />
      </div>
      <app-hero-avatar class="hero__avatar" />
      <div class="container hero__inner">
      <div class="hero__copy">
        <p class="hero__eyebrow">{{ t().hero.greeting }}</p>
        <h1 id="hero-title" class="hero__name">{{ t().hero.name }}</h1>
        <p class="hero__role">{{ t().hero.role }}</p>
        <p class="hero__location">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
          </svg>
          {{ t().hero.location }}
        </p>
        <a class="hero__ksu" [routerLink]="['/', lang()]" fragment="experience">
          <span class="hero__ksu-dot" aria-hidden="true"></span>{{ t().hero.ksuBadge }}
        </a>
        <p class="hero__tagline">{{ t().hero.tagline }}</p>

        <div class="hero__cta">
          <a class="btn btn--primary" [href]="'mailto:' + email">{{ t().hero.ctaPrimary }}</a>
          <a class="btn btn--outline" [routerLink]="['/', lang()]" fragment="work">{{ t().hero.ctaWork }}</a>
          <a class="btn btn--outline btn--cv" [href]="cv()" download>{{ t().hero.ctaSecondary }}</a>
        </div>
      </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      min-height: calc(100vh - var(--nav-h));
      display: grid;
      align-items: center;
    }
    .hero__inner {
      /* extra bottom space keeps the buttons above the ground band of the scene */
      padding-block: clamp(32px, 4vw, 56px) clamp(90px, 11vw, 150px);
    }
    .hero__copy {
      max-width: min(540px, 48%);
    }
    /* The scene sits on the inline-end side and dissolves into the page background on every edge,
       so the hero blends with the rest of the site instead of ending in a hard ground block. */
    .hero__bg {
      position: absolute;
      inset-block: 0;
      inset-inline-end: 0;
      z-index: -1;
      width: min(74%, 1100px);
      animation: bg-in 1.2s var(--ease-out) backwards;
      --fade-x: linear-gradient(to right, transparent 0, rgba(0, 0, 0, 0.3) 30%, #000 58%);
      --fade-y: linear-gradient(to bottom, transparent 0, #000 16%, #000 70%, transparent 100%);
      -webkit-mask-image: var(--fade-x), var(--fade-y);
      mask-image: var(--fade-x), var(--fade-y);
      -webkit-mask-composite: source-in;
      mask-composite: intersect;
    }
    :host-context(html[dir='rtl']) .hero__bg {
      --fade-x: linear-gradient(to left, transparent 0, rgba(0, 0, 0, 0.3) 30%, #000 58%);
    }
    .hero__bg app-skyline-scene { display: block; width: 100%; height: 100%; }
    /* In Arabic the copy sits on the right, so the scene is mirrored: sun and towers stay visible on the left. */
    :host-context(html[dir='rtl']) .hero__bg app-skyline-scene { transform: scaleX(-1); }
    @keyframes bg-in { from { opacity: 0; } to { opacity: 1; } }
    .hero__copy > * {
      animation: hero-in 0.8s var(--ease-out) both;
    }
    .hero__copy > :nth-child(1) { animation-delay: 0.05s; }
    .hero__copy > :nth-child(2) { animation-delay: 0.15s; }
    .hero__copy > :nth-child(3) { animation-delay: 0.25s; }
    .hero__copy > :nth-child(4) { animation-delay: 0.32s; }
    .hero__copy > :nth-child(5) { animation-delay: 0.4s; }
    .hero__copy > :nth-child(6) { animation-delay: 0.5s; }

    .hero__eyebrow {
      margin: 0 0 6px;
      color: var(--accent);
      font-weight: 700;
      font-size: 1.15rem;
    }
    .hero__ksu {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-top: 14px;
      padding: 7px 16px;
      border-radius: 999px;
      border: 1px solid color-mix(in srgb, var(--accent) 45%, var(--border));
      background: color-mix(in srgb, var(--accent) 10%, transparent);
      color: var(--text);
      font-weight: 700;
      font-size: 0.95rem;
      text-decoration: none;
      transition: transform 0.3s var(--ease-out), border-color 0.3s;
    }
    .hero__ksu:hover { transform: translateY(-2px); border-color: var(--accent); }
    .hero__ksu-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent);
      animation: ksu-pulse 2s infinite;
    }
    @keyframes ksu-pulse { 70% { box-shadow: 0 0 0 9px transparent; } 100% { box-shadow: 0 0 0 0 transparent; } }
    .hero__name {
      font-size: clamp(2.4rem, 6vw, 3.5rem);
      font-weight: 800;
      letter-spacing: -0.01em;
    }
    .hero__role {
      margin: 14px 0 0;
      font-size: clamp(1.1rem, 2.2vw, 1.45rem);
      font-weight: 600;
      color: var(--accent-2);
    }
    .hero__location {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 10px 0 0;
      color: var(--text-muted);
      font-size: 0.98rem;
    }
    .hero__tagline {
      margin: 22px 0 0;
      max-width: 34em;
      color: var(--text-muted);
      font-size: 1.1rem;
    }
    .hero__cta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 28px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      padding: 0 20px;
      border-radius: 999px;
      font-size: 0.95rem;
      font-weight: 700;
      white-space: nowrap;
      text-decoration: none;
      transition: transform 0.3s var(--ease-out), box-shadow 0.3s, background 0.3s;
    }
    .btn--primary {
      background: var(--accent);
      color: var(--accent-contrast);
      box-shadow: 0 10px 28px -12px var(--accent);
    }
    .btn--primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 32px -12px var(--accent);
    }
    .btn--outline {
      border: 1.5px solid var(--border);
    }
    .btn--outline:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
    }
    /* Phones: the two main actions share the first row, the CV download sits full-width below. */
    @media (max-width: 560px) {
      .hero__cta .btn { flex: 1 1 0; padding-inline: 12px; }
      .hero__cta .btn--cv { flex-basis: 100%; }
    }

    .hero__avatar {
      position: absolute;
      inset-inline-end: clamp(16px, 8vw, 140px);
      bottom: -4px;
      width: clamp(110px, 14vw, 210px);
      pointer-events: none;
      animation: avatar-in 0.9s var(--ease-out) 0.9s backwards;
    }
    @keyframes avatar-in {
      from { opacity: 0; transform: translateY(40px) scale(0.9); }
      to { opacity: 1; transform: none; }
    }
    @keyframes hero-in {
      from { opacity: 0; transform: translateY(18px); }
      to { opacity: 1; transform: none; }
    }

    @media (max-width: 900px) {
      .hero { align-items: start; min-height: 0; }
      .hero__inner { padding-block: 28px clamp(250px, 56vw, 430px); }
      .hero__copy { max-width: none; }
      /* On phones the scene is a band along the bottom, fading up into the copy. */
      .hero__bg,
      :host-context(html[dir='rtl']) .hero__bg {
        inset-block: auto 0;
        inset-inline: 0;
        width: 100%;
        height: clamp(250px, 56vw, 430px);
        --fade-x: linear-gradient(#000, #000);
        --fade-y: linear-gradient(to bottom, transparent 0, #000 42%, #000 78%, transparent 100%);
      }
      .hero__avatar { width: clamp(96px, 25vw, 150px); inset-inline-end: 7%; bottom: 0; }
    }
  `,
})
export class Hero {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  protected readonly lang = this.i18n.lang;
  protected readonly email = SITE.email;
  protected readonly cv = computed(() => SITE.cvPath[this.i18n.lang()]);
}
