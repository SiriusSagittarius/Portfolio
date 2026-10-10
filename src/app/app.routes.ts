import { Routes } from '@angular/router';
import { Main } from './layout/main/main';

export const routes: Routes = [
  // Startseite direkt im Haupt-Bundle: spart einen Request-Wasserfall vor dem LCP-Bild
  { path: '', component: Main },
  {
    path: 'imprint',
    loadComponent: () => import('./shared/components/imprint/imprint').then((m) => m.Imprint),
  },
  {
    path: 'privacy',
    loadComponent: () => import('./shared/components/privacy/privacy').then((m) => m.Privacy),
  },
  { path: '**', redirectTo: '' },
];
