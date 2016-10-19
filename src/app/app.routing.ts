import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'example', loadChildren: './pages/+example/example.module#ExampleModule' },
    { path: 'login', loadChildren: './pages/+login/login.module#LoginModule' },
    { path: '404', loadChildren: './pages/+404/404.module#Module404' },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
