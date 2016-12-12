import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'example', loadChildren: './pages/+example/example.module#ExampleModule' },
    { path: 'login', loadChildren: './pages/+login/login.module#LoginModule' },
    {
        path: '404',
        // 使用 webpack2 自带的 System 引入模块
        loadChildren: () => System.import('./pages/+404/404.module').then((comp: any) => comp.default)
    },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
