import { Directive, ElementRef, inject } from '@angular/core';

/** Soft glow that follows the pointer inside a card. Reads `--mx` / `--my` in CSS. */
@Directive({
  selector: '[appSpotlight]',
  host: { '(pointermove)': 'move($event)' },
})
export class Spotlight {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  protected move(event: PointerEvent): void {
    const box = this.el.nativeElement.getBoundingClientRect();
    this.el.nativeElement.style.setProperty('--mx', `${event.clientX - box.left}px`);
    this.el.nativeElement.style.setProperty('--my', `${event.clientY - box.top}px`);
  }
}
