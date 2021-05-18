import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/**
 *  Routing para o template do projeto.
 */

import { TemplateModule } from './template/template.module';

/**
 *  Routing para as páginas do projeto.
 */

import { PagesModule } from './pages/pages.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TemplateModule,
    PagesModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
