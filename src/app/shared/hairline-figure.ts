import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { branches, exploded, hub, laptop, phone, rebuild } from '@lucasmarkes/hairline';
import type { Figure } from '@lucasmarkes/hairline';
import { ThemeService } from '../core/theme.service';

/**
 * Isometric line figures that answer the pointer: "hairline" by Lucas Marques (MIT licence, https://github.com/lucasmarkes/hairline).
 * Only the figures listed here are imported so the rest is tree-shaken away. Always render inside `@defer`
 * so the library loads when the figure nears the viewport, not with the page.
 */
const FIGURES = { exploded, branches, rebuild, laptop, phone, hub } as const;
export type FigureName = keyof typeof FIGURES;

@Component({
  selector: 'app-hairline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div #host class="figure"></div>`,
  styles: `
    :host { display: block; }
    /* Map the figure palette onto the site tokens. --fig-plate must equal the colour the figure sits on. */
    .figure {
      --hairline-plate: var(--fig-plate, var(--bg));
      --hairline-hi: var(--fig-hi, var(--accent));
      --hairline-edge: var(--fig-edge, var(--text));
      --hairline-mid: var(--fig-mid, var(--text-muted));
      --hairline-lo: var(--fig-lo, var(--border));
    }
  `,
})
export class HairlineFigure {
  readonly figure = input.required<FigureName>();
  readonly label = input<string>();
  readonly intensity = input(0.6);
  /** Fixed theme (e.g. on a panel that is dark in both site themes); omit to follow the site theme. */
  readonly theme = input<'light' | 'dark'>();

  private readonly host = viewChild.required<ElementRef<HTMLElement>>('host');
  private readonly siteTheme = inject(ThemeService).mode;
  private readonly resolved = computed(() => this.theme() ?? this.siteTheme());
  private instance?: Figure;

  constructor() {
    afterNextRender(() => {
      this.instance = FIGURES[this.figure()](this.host().nativeElement, {
        intensity: this.intensity(),
        label: this.label(),
        theme: this.resolved(),
        play: true,
      });
    });
    effect(() => {
      this.instance?.update({ intensity: this.intensity(), label: this.label(), theme: this.resolved() });
    });
    inject(DestroyRef).onDestroy(() => this.instance?.destroy());
  }
}
