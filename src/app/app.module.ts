import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// 暂时
import { HttpModule } from '@angular/http';

/* import 核心模块 */
import { CoreModule } from './core/core.module';
/* import App 路由 */
import { routing, appRoutingProviders } from './app.routing';
/* import 根组件 */
import { AppComponent } from './app.component';
/* import 特性模块 */
import { HomeModule } from './pages/home/home.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        CoreModule.forRoot(),
        HomeModule,
        routing
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
