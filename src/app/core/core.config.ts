import { Routes } from "@angular/router";

export const CORE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./core').then(m => m.Core),
    }
];