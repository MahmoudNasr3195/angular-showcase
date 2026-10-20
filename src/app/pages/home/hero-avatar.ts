import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, signal, untracked } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

/**
 * Original cartoon developer who waves from behind a laptop (decorative).
 * Colours come from CSS tokens; blinking, waving and bobbing stop with prefers-reduced-motion.
 */
@Component({
  selector: 'app-hero-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:pointermove)': 'onMove($event)' },
  template: `
    <svg class="av" [class.av--night]="night()" [class.av--hop]="hop()" viewBox="0 0 200 240" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="nasr-av-glow" cx="0.5" cy="1" r="0.9">
          <stop offset="0" stop-color="#9fc4ff" stop-opacity="0.55" />
          <stop offset="1" stop-color="#9fc4ff" stop-opacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="234" rx="78" ry="6" class="av__shadow" />
      <g class="av__bob">
        <!-- torso: plaid shirt -->
        <path class="av__shirt" d="M26 236 Q26 170 100 160 Q174 170 174 236 Z" />
        <g class="av__plaid">
          <path d="M60 170 V236 M84 162 V236 M116 162 V236 M140 170 V236" />
          <path d="M30 200 H170 M40 218 H160" />
        </g>
        <path class="av__collar" d="M72 162 L100 190 L90 160 Z M128 162 L100 190 L110 160 Z" />
        <!-- neck -->
        <rect class="av__skin-shade" x="88" y="136" width="24" height="30" rx="8" />
        <!-- ears + head -->
        <circle class="av__skin" cx="59" cy="108" r="8" />
        <circle class="av__skin" cx="141" cy="108" r="8" />
        <ellipse class="av__skin" cx="100" cy="104" rx="41" ry="45" />
        <!-- hair with a small quiff -->
        <path class="av__hair" d="M57 102 Q50 50 100 46 Q150 50 143 102 Q134 80 112 76 Q90 84 70 78 Q60 88 57 102 Z" />
        <path class="av__hair" d="M92 50 Q104 34 122 44 Q108 44 104 56 Z" />
        <!-- beard + moustache -->
        <path class="av__hair av__beard" d="M60 112 Q62 150 100 153 Q138 150 140 112 Q134 134 120 137 Q100 129 80 137 Q66 134 60 112 Z" />
        <ellipse class="av__skin" cx="100" cy="135" rx="15" ry="8" />
        <path class="av__hair" d="M80 127 Q90 118 100 124 Q110 118 120 127 Q110 131 100 128 Q90 131 80 127 Z" />
        <path class="av__teeth" d="M89 132 Q100 143 111 132 Q100 136 89 132 Z" />
        <circle class="av__cheek" cx="71" cy="120" r="6" />
        <circle class="av__cheek" cx="129" cy="120" r="6" />
        <!-- nose -->
        <path class="av__nose" d="M98 108 Q96 118 100 119 Q104 118 102 108" />
        <!-- eyes (follow the pointer) -->
        <g class="av__eyes">
          <ellipse class="av__white" cx="83" cy="107" rx="6.5" ry="6" />
          <ellipse class="av__white" cx="117" cy="107" rx="6.5" ry="6" />
          <circle class="av__pupil" [attr.cx]="83 + look().x" [attr.cy]="107 + look().y" r="3.4" />
          <circle class="av__pupil" [attr.cx]="117 + look().x" [attr.cy]="107 + look().y" r="3.4" />
        </g>
        <!-- relaxed eyelids at night -->
        <rect class="av__lid" x="76" y="101" width="14" height="6" />
        <rect class="av__lid" x="110" y="101" width="14" height="6" />
        <!-- glasses -->
        <g class="av__glasses">
          <rect x="67" y="94" width="32" height="25" rx="9" />
          <rect x="101" y="94" width="32" height="25" rx="9" />
          <path d="M99 103 H101 M67 102 L59 99 M133 102 L141 99" />
        </g>
        <path class="av__brow" d="M70 90 Q82 84 96 89" />
        <path class="av__brow" d="M104 89 Q118 84 130 90" />
        <!-- waving arm -->
        <g class="av__wave">
          <path class="av__arm" d="M160 186 Q186 168 180 134" />
          <circle class="av__skin" cx="180" cy="124" r="11" />
        </g>
        <!-- screen light on the face (night) -->
        <ellipse class="av__glow" cx="100" cy="150" rx="62" ry="64" fill="url(#nasr-av-glow)" />
        <!-- laptop (lid seen from behind) -->
        <rect class="av__laptop" x="46" y="176" width="108" height="58" rx="7" />
        <path class="av__logo" d="M100 188 L112 195 V209 L100 216 L88 209 V195 Z" />
        <rect class="av__laptop-base" x="36" y="232" width="128" height="6" rx="3" />
      </g>
    </svg>
  `,
  styles: `
    :host { display: block; }
    .av { display: block; width: 100%; height: auto; overflow: visible; }
    .av__shadow { fill: #000; opacity: 0.22; }
    .av__shirt { fill: var(--avatar-shirt); }
    .av__plaid path { fill: none; stroke: var(--avatar-plaid); stroke-width: 3; opacity: 0.55; }
    .av__collar { fill: var(--avatar-shirt-dark); }
    .av__beard { opacity: 0.4; }
    .av__teeth { fill: #fff; }
    .av__nose { fill: none; stroke: var(--skin-shade); stroke-width: 3; stroke-linecap: round; }
    .av__white { fill: #fff; }
    .av__pupil { fill: var(--navy-900); transition: cx 0.12s, cy 0.12s; }
    .av__glasses rect { fill: rgba(255, 255, 255, 0.18); stroke: var(--hair); stroke-width: 4; }
    .av__glasses path { fill: none; stroke: var(--hair); stroke-width: 4; stroke-linecap: round; }
        .av__skin { fill: var(--skin); }
    .av__skin-shade { fill: var(--skin-shade); }
    .av__hair { fill: var(--hair); }
    .av__brow { fill: none; stroke: var(--hair); stroke-width: 3.5; stroke-linecap: round; }
    .av__eyes { transform-box: fill-box; transform-origin: center; animation: av-blink 5s infinite; }
    .av__cheek { fill: #f59bb0; opacity: 0.4; }
        .av__arm { fill: none; stroke: var(--avatar-shirt); stroke-width: 17; stroke-linecap: round; }
    .av__laptop { fill: var(--avatar-laptop); }
    .av__laptop-base { fill: var(--avatar-laptop-base); }
    .av__logo { fill: var(--gold-400); filter: drop-shadow(0 0 5px color-mix(in srgb, var(--gold-400) 70%, transparent)); }

    .av__lid { fill: var(--skin); transform-box: fill-box; transform-origin: top; transform: scaleY(0); transition: transform 0.6s var(--ease-out); }
    .av--night .av__lid { transform: scaleY(0.55); }
    .av__glow { opacity: 0; transition: opacity 0.8s ease; pointer-events: none; }
    .av--night .av__glow { opacity: 1; }
    .av--night .av__shirt, .av--night .av__arm { filter: brightness(0.82); }
    .av--night .av__logo { filter: drop-shadow(0 0 9px var(--gold-400)); }
    .av--hop { animation: av-hop 0.7s var(--ease-out); }
    @keyframes av-hop { 30% { transform: translateY(-14px) rotate(-3deg); } 60% { transform: translateY(0) rotate(2deg); } 100% { transform: none; } }
    .av__bob { animation: av-bob 4s ease-in-out infinite; transform-origin: 100px 236px; }
    .av__wave { transform-box: view-box; transform-origin: 160px 186px; animation: av-wave 3.2s ease-in-out infinite; }

    @keyframes av-blink { 0%, 92%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }
    @keyframes av-bob { 50% { transform: translateY(-3px); } }
    @keyframes av-wave {
      0%, 55%, 100% { transform: rotate(0); }
      10% { transform: rotate(-16deg); }
      20% { transform: rotate(8deg); }
      30% { transform: rotate(-16deg); }
      40% { transform: rotate(8deg); }
      48% { transform: rotate(-8deg); }
    }
  `,
})
export class HeroAvatar {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  /** Pupil offset in SVG units; the eyes glance toward the pointer. */
  protected readonly look = signal({ x: 0, y: 0 });
  private frame = 0;

  private readonly theme = inject(ThemeService);
  protected readonly night = () => this.theme.mode() === 'dark';
  protected readonly hop = signal(false);
  private first = true;

  constructor() {
    effect(() => {
      this.theme.mode();
      if (this.first) {
        this.first = false;
        return;
      }
      untracked(() => {
        this.hop.set(false);
        setTimeout(() => {
          this.hop.set(true);
          setTimeout(() => this.hop.set(false), 750);
        }, 20);
      });
    });
  }

  protected onMove(e: PointerEvent): void {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      const r = this.el.nativeElement.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height * 0.45);
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 250) * 2.6;
      this.look.set({ x: +((dx / d) * k).toFixed(2), y: +((dy / d) * k * 0.8).toFixed(2) });
    });
  }
}
