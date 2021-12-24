import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElementsListComponent } from './elements-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ObjetDisplayComponent } from './file-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ObjetFormComponent } from './objet-form.component';
import { ObjetNameComponent } from './objet-name.component';
import { ObjetEditFormComponent } from './file-edit-form.component';
//import { ImageFormComponent } from './image-form.component';
//import { ImageEditFormComponent } from './image-edit-form.component';
//import { ImageDisplayComponent } from './image-display.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementsListComponent,
    ObjetDisplayComponent,
    ObjetEditFormComponent,
    ObjetFormComponent,
    ObjetNameComponent
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
