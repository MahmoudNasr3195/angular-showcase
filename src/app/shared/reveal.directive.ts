import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute, signal } from '@angular/core';

/**
 * Fades/slides an element in the first time it scrolls into view.
 * Content is fully visible without JS, during prerender, and with reduced motion —
 * the hidden state only exists once the browser has taken over.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    '[class.reveal]': 'armed()',
    '[class.is-visible]': 'visible()',
    '[style.--d]': 'delay() + "ms"',
  },
})
export class Reveal {
  /** Optional stagger delay in ms: `<div appReveal="120">`. */
  readonly delay = input(0, { alias: 'appReveal', transform: numberAttribute });

  protected readonly armed = signal(false);
  protected readonly visible = signal(false);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

      this.armed.set(true);
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this.visible.set(true);
            io.disconnect();
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
      );
      io.observe(this.el.nativeElement);
      this.destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
