import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { Page404 } from './404.page';

import { routing } from './404.routing';

@NgModule({
    imports: [
        routing,
        SharedModule
    ],
    declarations: [
        Page404
    ]
})
export class Module404 {}
