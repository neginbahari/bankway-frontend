import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/basic-information/basic-information.component').then(
        (m) => m.BasicInformationComponent
      ),
  },
];
