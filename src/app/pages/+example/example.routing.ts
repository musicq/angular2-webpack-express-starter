import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamplePage } from './example.page';

const routes: Routes = [
    { path: '', component: ExamplePage }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
