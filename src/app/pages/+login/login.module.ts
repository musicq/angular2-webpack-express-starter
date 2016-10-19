import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { LoginPage } from './login.page';

import { routing } from './login.routing';

@NgModule({
    imports: [
        SharedModule,
        routing
    ],
    declarations: [
        LoginPage
    ]
})
export class LoginModule {}
