import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoaServiceComponent } from './pessoa-service/pessoa-service.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { InitialPageV2Component } from './initial-page-v2/initial-page-v2.component';

@NgModule({
  declarations: [
    AppComponent,
    PessoaServiceComponent,
    InitialPageComponent,
    InitialPageV2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
