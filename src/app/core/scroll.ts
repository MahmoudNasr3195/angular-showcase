/**
 * Smooth in-page scroll that lands on the section's heading (not on its empty top padding), just under the sticky header.
 * Needed because a plain `#id` link resolves against <base href="/"> and leaves the page.
 */
export function scrollToSection(id: string): void {
  const section = document.getElementById(id);
  if (!section) return;
  const target = section.querySelector<HTMLElement>('.section__head, .panel') ?? section;
  const header = document.querySelector<HTMLElement>('header');
  const offset = (header?.offsetHeight ?? 0) + 24;
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
  window.scrollTo({ top, behavior: 'smooth' });
}
