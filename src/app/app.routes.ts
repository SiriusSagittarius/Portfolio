import { Routes } from '@angular/router';
import { Main } from './layout/main/main';
import { ImprintComponent } from './shared/components/imprint/imprint';

export const routes: Routes = [
  { path: '', component: Main },
  { path: 'imprint', component: ImprintComponent },
];
