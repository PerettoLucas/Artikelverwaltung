import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { ArticleListComponent } from './article-list/article-list.component';
import { NewArticleComponent } from './new-article/new-article.component';
import {MatTableModule} from '@angular/material/table';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {LOCALE_ID} from '@angular/core';
registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    NewArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
