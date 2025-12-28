import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'core',
        loadChildren: () => import('./core/core.config').then(m => m.CORE_ROUTES)
    },
    {
        path: 'advanced',
        loadChildren: () => import('./advanced/advanced.config').then(m => m.ADVANCED_ROUTES)
    },
    {
        path: '',
        redirectTo: 'advanced',
        pathMatch: 'full'
    }
];
