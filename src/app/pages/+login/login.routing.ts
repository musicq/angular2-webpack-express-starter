import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

const routers: Routes = [
    { path: '', component: LoginPage }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routers);
