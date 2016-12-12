import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({

})
export class CoreModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: []
        };
    }

    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule 已经加载过了! 确保只在 AppModule 中 import 它。');
        }
    }

}
