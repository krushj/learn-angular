import { Routes } from '@angular/router';

export const ADVANCED_ROUTES: Routes = [
    {
      path: 'form',
      loadComponent: () => import('./reactive-form/reactive-form').then(m => m.ReactiveForm)
    },
    {
      path: '',
      redirectTo: 'form',
      pathMatch: 'full'
    },
  ];