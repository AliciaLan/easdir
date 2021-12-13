import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElementsListComponent } from './elements-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TexteDisplayComponent } from './texte-display.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementsListComponent,
    TexteDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
