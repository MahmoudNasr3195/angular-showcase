import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, computed, inject, input, signal } from '@angular/core';

/** Number that counts up once when scrolled into view. Shows the final value without JS / with reduced motion. */
@Component({
  selector: 'app-count-up',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ shown() }}{{ suffix() }}`,
  styles: `:host { font-variant-numeric: tabular-nums; }`,
})
export class CountUp {
  readonly value = input.required<number>();
  readonly suffix = input('');

  private readonly current = signal<number | null>(null);
  protected readonly shown = computed(() => this.current() ?? this.value());

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

      let frame = 0;
      const io = new IntersectionObserver((entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const target = this.value();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          this.current.set(Math.round(target * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        this.current.set(0);
        frame = requestAnimationFrame(tick);
      });
      io.observe(this.el.nativeElement);
      this.destroyRef.onDestroy(() => {
        io.disconnect();
        cancelAnimationFrame(frame);
      });
    });
  }
}
