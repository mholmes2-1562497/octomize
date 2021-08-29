import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModelViewComponent } from './model-view/model-view.component';
import '@cds/core/icon/register.js';
import { ClarityIcons, userIcon, homeIcon, lineChartIcon, angleIcon } from '@cds/core/icon';
import { HttpClientModule } from '@angular/common/http';

ClarityIcons.addIcons(userIcon, homeIcon, lineChartIcon, userIcon);
@NgModule({
  declarations: [
    AppComponent,
    ModelViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
