import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { ExamplePage } from './example.page';

import { routing } from './example.routing';

@NgModule({
    imports: [
        SharedModule,
        routing
    ],
    declarations: [ ExamplePage ]
})
export class ExampleModule {}
