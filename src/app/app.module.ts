import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElementsListComponent } from './elements-list.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ObjetDisplayComponent } from './file-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ObjetFormComponent } from './objet-form.component';
import { ObjetNameComponent } from './objet-name.component';
import { ObjetEditFormComponent } from './file-edit-form.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http : HttpClient) {
return new TranslateHttpLoader(http);
}
