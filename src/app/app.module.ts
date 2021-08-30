import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import '@cds/core/icon/register.js';
import { ClarityIcons, userIcon, homeIcon, lineChartIcon, angleIcon } from '@cds/core/icon';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.component.service';
import { FormsModule } from '@angular/forms';

ClarityIcons.addIcons(userIcon, homeIcon, lineChartIcon, userIcon);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
