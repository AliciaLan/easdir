import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElementsListComponent } from './elements-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TexteDisplayComponent } from './texte-display.component';
import { TexteFormComponent } from './texte-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DossierFormComponent } from './dossier-form.component';
import { TexteEditFormComponent } from './texte-edit-form.component';
import { ImageFormComponent } from './image-form.component';
import { ImageEditFormComponent } from './image-edit-form.component';
import { ImageDisplayComponent } from './image-display.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementsListComponent,
    TexteDisplayComponent,
    TexteFormComponent,
    DossierFormComponent,
    TexteEditFormComponent,
    ImageFormComponent,
    ImageEditFormComponent,
    ImageDisplayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
