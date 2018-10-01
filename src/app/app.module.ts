import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {FeaturedModule} from './featured/featured.module';
import {AppRouting} from './app.routes';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FeaturedModule,
    AppRouting,
    SharedModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
