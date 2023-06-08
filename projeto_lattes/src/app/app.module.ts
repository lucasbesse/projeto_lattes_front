import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoaServiceComponent } from './pessoa-service/pessoa-service.component';
import { ProjectServiceComponent } from './project-service/project-service.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { InitialPageV2Component } from './initial-page-v2/initial-page-v2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    PessoaServiceComponent,
    ProjectServiceComponent,
    InitialPageComponent,
    InitialPageV2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
