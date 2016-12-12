import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

export const routing: ModuleWithProviders = RouterModule.forChild([
    { path: 'home', component: HomePage }
]);
