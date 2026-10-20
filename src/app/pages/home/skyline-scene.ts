import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

interface Block {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface Win {
  x: number;
  y: number;
  delay: number;
}

/** Small deterministic PRNG so the generated windows are identical on every render (SSR-safe). */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function windowsFor(blocks: Block[], seed: number): Win[] {
  const rnd = mulberry32(seed);
  const out: Win[] = [];
  for (const b of blocks) {
    for (let y = b.y + 12; y < b.y + b.h - 8; y += 13) {
      for (let x = b.x + 7; x < b.x + b.w - 8; x += 11) {
        if (rnd() > 0.46) out.push({ x, y, delay: Math.round(rnd() * 5000) });
      }
    }
  }
  return out;
}

const STARS = (() => {
  const rnd = mulberry32(42);
  return Array.from({ length: 34 }, () => ({
    x: Math.round(rnd() * 780 + 10),
    y: Math.round(rnd() * 240 + 10),
    r: +(rnd() * 1.4 + 0.6).toFixed(1),
    delay: Math.round(rnd() * 4000),
  }));
})();

/**
 * Original illustration: a stylised Riyadh skyline (Faisaliyah + Kingdom Centre)
 * that turns from day to night with the site theme. Colours come from CSS tokens.
 */
@Component({
  selector: 'app-skyline-scene',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg class="scene" viewBox="0 0 800 520" role="img" [attr.aria-label]="label()" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="nasr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" class="scene__sky-top" />
          <stop offset="1" class="scene__sky-bottom" />
        </linearGradient>
        <linearGradient id="nasr-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" class="scene__ground-stop" />
          <stop offset="1" class="scene__ground-stop" stop-opacity="0" />
        </linearGradient>
        <radialGradient id="nasr-glow">
          <stop offset="0" class="scene__glow" />
          <stop offset="1" class="scene__glow" stop-opacity="0" />
        </radialGradient>
        <mask id="nasr-kc-hole">
          <rect width="800" height="520" fill="#fff" />
          <path d="M492 178 Q508 150 524 178 V240 H492 Z" fill="#000" />
        </mask>
        <mask id="nasr-crescent">
          <rect x="-60" y="-60" width="120" height="120" fill="#fff" />
          <circle cx="14" cy="-8" r="26" fill="#000" />
        </mask>
      </defs>

      <rect width="800" height="520" fill="url(#nasr-sky)" />

      <!-- Stars (night only) -->
      <g class="scene__stars" aria-hidden="true">
        @for (s of stars; track $index) {
          <circle [attr.cx]="s.x" [attr.cy]="s.y" [attr.r]="s.r" [style.animation-delay.ms]="s.delay" />
        }
      </g>

      <!-- Sun (day) -->
      <g class="scene__sun" aria-hidden="true">
        <circle cx="590" cy="190" r="170" fill="url(#nasr-glow)" />
        <circle cx="590" cy="190" r="46" class="scene__sun-core" />
      </g>

      <!-- Moon (night) -->
      <g class="scene__moon" aria-hidden="true">
        <circle cx="610" cy="150" r="150" fill="url(#nasr-glow)" />
        <g transform="translate(610 150)">
          <circle r="40" class="scene__moon-core" mask="url(#nasr-crescent)" />
        </g>
      </g>

      <!-- Clouds (day only) -->
      <g class="scene__clouds" aria-hidden="true">
        <g class="scene__cloud scene__cloud--a">
          <ellipse cx="170" cy="120" rx="52" ry="14" />
          <ellipse cx="205" cy="108" rx="34" ry="14" />
          <ellipse cx="140" cy="110" rx="28" ry="11" />
        </g>
        <g class="scene__cloud scene__cloud--b">
          <ellipse cx="420" cy="70" rx="44" ry="11" />
          <ellipse cx="448" cy="60" rx="28" ry="11" />
        </g>
      </g>

      <g transform="translate(0 40)">
        <!-- Far layer -->
        <g class="scene__far">
          @for (b of far; track $index) {
            <rect [attr.x]="b.x" [attr.y]="b.y" [attr.width]="b.w" [attr.height]="b.h" rx="2" />
          }
        </g>

        <!-- Mid layer -->
        <g class="scene__mid">
          @for (b of mid; track $index) {
            <rect class="scene__tower" [style.--i]="$index" [attr.x]="b.x" [attr.y]="b.y" [attr.width]="b.w" [attr.height]="b.h" rx="2" />
          }
        </g>
        <g class="scene__windows" aria-hidden="true">
          @for (w of midWindows; track $index) {
            <rect [attr.x]="w.x" [attr.y]="w.y" width="4" height="6" rx="1" [style.animation-delay.ms]="w.delay" />
          }
        </g>

        <!-- Landmarks -->
        <g class="scene__landmark">
          <!-- Faisaliyah-style tower -->
          <path class="scene__tower" style="--i: 3" d="M350 400 L360 250 H384 L394 400 Z" />
          <circle class="scene__ball" cx="372" cy="232" r="17" />
          <path d="M372 216 V168" class="scene__spire" />
          <!-- Kingdom Centre-style tower with the arch opening -->
          <path class="scene__tower" style="--i: 5" d="M470 400 V178 Q508 118 546 178 V400 Z" mask="url(#nasr-kc-hole)" />
        </g>

        <!-- Near layer -->
        <g class="scene__near">
          @for (b of near; track $index) {
            <rect [attr.x]="b.x" [attr.y]="b.y" [attr.width]="b.w" [attr.height]="b.h" rx="2" />
          }
        </g>
        <g class="scene__windows" aria-hidden="true">
          @for (w of nearWindows; track $index) {
            <rect [attr.x]="w.x" [attr.y]="w.y" width="4" height="6" rx="1" [style.animation-delay.ms]="w.delay" />
          }
        </g>

        <rect class="scene__ground" x="0" y="396" width="800" height="130" />
      </g>
    </svg>
  `,
  styles: `
    .scene {
      display: block;
      width: 100%;
      height: 100%;
    }
    .scene__sky-top { stop-color: var(--sky-top); }
    .scene__sky-bottom { stop-color: var(--sky-bottom); }
    .scene__glow { stop-color: var(--sun-glow); }
    .scene__sun-core { fill: var(--sun); }
    .scene__moon-core { fill: var(--sun); }
    .scene__far rect { fill: var(--skyline-far); }
    .scene__mid rect, .scene__mid path { fill: var(--skyline-mid); }
    .scene__landmark path, .scene__landmark circle { fill: var(--skyline-near); }
    .scene__landmark .scene__ball { fill: var(--gold-500); }
    .scene__landmark .scene__spire { fill: none; stroke: var(--skyline-near); stroke-width: 3; stroke-linecap: round; }
    .scene__near rect { fill: var(--skyline-near); }
    .scene__ground { fill: url(#nasr-ground); }
    .scene__ground-stop { stop-color: var(--ground); }
    .scene__clouds ellipse { fill: #fff; opacity: 0.85; }
    .scene__stars circle { fill: #fff; }
    .scene__windows rect { fill: var(--window); }

    /* Day / night cross-over (these transitions play inside the circular reveal) */
    .scene__sun, .scene__moon, .scene__clouds, .scene__stars, .scene__windows {
      transition: opacity 0.7s ease, transform 0.9s var(--ease-out);
    }
    .scene__sun, .scene__moon { transform-box: view-box; }
    .scene__moon, .scene__stars, .scene__windows { opacity: 0; }
    .scene__moon { transform: translateY(70px); }
    :root[data-theme='dark'] .scene__sun { opacity: 0; transform: translateY(90px); }
    :root[data-theme='dark'] .scene__clouds { opacity: 0; }
    :root[data-theme='dark'] .scene__moon { opacity: 1; transform: none; }
    :root[data-theme='dark'] .scene__stars,
    :root[data-theme='dark'] .scene__windows { opacity: 1; }
    :root[data-theme='dark'] .scene__landmark .scene__ball { filter: drop-shadow(0 0 8px var(--gold-400)); }

    /* Ambient motion */
    .scene__stars circle { animation: scene-twinkle 3.6s ease-in-out infinite; }
    .scene__windows rect { animation: scene-flicker 6s ease-in-out infinite; }
    .scene__cloud { animation: scene-drift 38s linear infinite alternate; }
    .scene__cloud--b { animation-duration: 52s; animation-direction: alternate-reverse; }

    /* Entrance */
    .scene__tower {
      transform-box: fill-box;
      transform-origin: 50% 100%;
      animation: scene-grow 0.9s var(--ease-out) backwards;
      animation-delay: calc(var(--i, 0) * 70ms + 150ms);
    }
    /* 'backwards' (not 'both'): a held end-state would override the night rule that hides the sun. */
    .scene__sun { animation: scene-rise 1.1s var(--ease-out) 0.2s backwards; }

    @keyframes scene-grow { from { transform: scaleY(0.1); opacity: 0; } to { transform: none; opacity: 1; } }
    @keyframes scene-rise { from { transform: translateY(60px); opacity: 0; } to { transform: none; opacity: 1; } }
    @keyframes scene-twinkle { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
    @keyframes scene-flicker { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
    @keyframes scene-drift { from { transform: translateX(-26px); } to { transform: translateX(34px); } }
  `,
})
export class SkylineScene {
  readonly label = input.required<string>();

  protected readonly stars = STARS;

  protected readonly far: Block[] = [
    { x: 24, y: 300, w: 50, h: 100 }, { x: 84, y: 330, w: 40, h: 70 }, { x: 136, y: 290, w: 36, h: 110 },
    { x: 186, y: 322, w: 60, h: 78 }, { x: 258, y: 306, w: 44, h: 94 }, { x: 560, y: 338, w: 50, h: 62 },
    { x: 622, y: 312, w: 50, h: 88 }, { x: 684, y: 286, w: 40, h: 114 }, { x: 736, y: 326, w: 60, h: 74 },
  ];

  protected readonly mid: Block[] = [
    { x: 100, y: 272, w: 40, h: 128 }, { x: 150, y: 306, w: 54, h: 94 }, { x: 214, y: 250, w: 44, h: 150 },
    { x: 280, y: 296, w: 50, h: 104 }, { x: 410, y: 286, w: 46, h: 114 }, { x: 560, y: 304, w: 44, h: 96 },
    { x: 622, y: 262, w: 46, h: 138 }, { x: 690, y: 300, w: 58, h: 100 },
  ];

  protected readonly near: Block[] = [
    { x: 0, y: 352, w: 74, h: 48 }, { x: 78, y: 368, w: 60, h: 32 }, { x: 142, y: 346, w: 52, h: 54 },
    { x: 330, y: 372, w: 40, h: 28 }, { x: 396, y: 362, w: 62, h: 38 }, { x: 556, y: 360, w: 56, h: 40 },
    { x: 620, y: 372, w: 70, h: 28 }, { x: 696, y: 350, w: 52, h: 50 }, { x: 752, y: 366, w: 48, h: 34 },
  ];

  protected readonly midWindows = windowsFor(this.mid, 7);
  protected readonly nearWindows = windowsFor(this.near, 19);
}
