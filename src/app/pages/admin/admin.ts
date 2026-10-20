import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Admin dashboard — placeholder until phase 3 (Supabase auth + projects CRUD). */
@Component({
  selector: 'app-admin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container admin">
      <h1>Dashboard</h1>
      <p>Coming in phase 3.</p>
    </section>
  `,
  styles: `
    .admin { padding-block: 96px; }
  `,
})
export class Admin {}
