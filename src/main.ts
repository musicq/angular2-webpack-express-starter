/**
 * @import 应用级样式
 */
import './assets/css/styles.css';
import './assets/css/spin.css';

/**
 * @import 启动模块
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

/**
 * @import 根模块
 */
import { AppModule } from './app/app.module';

if (process.env.ENV === 'production') enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
