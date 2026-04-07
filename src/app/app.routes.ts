import { Routes } from '@angular/router';
import { Main } from './layout/main/main';
import { ImprintComponent } from './shared/components/imprint/imprint';
import { Privacy } from './shared/components/privacy/privacy'; // Pfad anpassen!

export const routes: Routes = [
  { path: '', component: Main },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy', component: Privacy },
];
