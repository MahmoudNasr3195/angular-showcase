import { Routes } from '@angular/router';
import { Shell } from './layout/shell';

/** Pages that exist in both languages (/en/... and /ar/...). */
const publicPages: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
];

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'en' },
  { path: 'en', component: Shell, data: { lang: 'en' }, children: publicPages },
  { path: 'ar', component: Shell, data: { lang: 'ar' }, children: publicPages },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then((m) => m.Admin),
  },
  // Real 404: served with a 404 status by the host by the host, never redirected to the home page.
  { path: '404', loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound) },
];
