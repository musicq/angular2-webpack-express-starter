import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { HomePage } from './home.page';

import { routing } from './home.routing';

@NgModule({
    imports: [
        SharedModule,
        routing
    ],
    declarations: [
        HomePage
    ]
})
export class HomeModule {}
