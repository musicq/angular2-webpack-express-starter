import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Page404 } from './404.page';

const routers: Routes = [
    { path: '', component: Page404 }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routers);
