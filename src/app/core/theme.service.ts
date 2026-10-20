import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/**
 * Day / night theme.
 * The first paint is handled by the inline script in index.html (no flash);
 * this service takes over afterwards and animates the switch as a circular
 * reveal that starts from the toggle button (View Transitions API).
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);

  readonly mode = signal<ThemeMode>(this.read());

  toggle(origin?: { x: number; y: number }): void {
    const next: ThemeMode = this.mode() === 'dark' ? 'light' : 'dark';
    const apply = () => this.apply(next);

    const win = this.doc.defaultView;
    const reduce = win?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? false;
    const start = (this.doc as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    }).startViewTransition?.bind(this.doc);

    if (!win || !start || reduce) {
      apply();
      return;
    }

    const x = origin?.x ?? win.innerWidth / 2;
    const y = origin?.y ?? 0;
    const radius = Math.hypot(Math.max(x, win.innerWidth - x), Math.max(y, win.innerHeight - y));

    start(apply).ready.then(() => {
      this.doc.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    });
  }

  private apply(mode: ThemeMode): void {
    this.mode.set(mode);
    this.doc.documentElement.setAttribute('data-theme', mode);
    try {
      this.doc.defaultView?.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* storage unavailable (private mode) — theme still applies for the session */
    }
  }

  private read(): ThemeMode {
    const attr = this.doc.documentElement.getAttribute('data-theme');
    return attr === 'dark' ? 'dark' : 'light';
  }
}
