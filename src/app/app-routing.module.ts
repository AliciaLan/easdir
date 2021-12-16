import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementsListComponent } from './elements-list.component';
import { TexteDisplayComponent } from './texte-display.component';
import { ImageDisplayComponent } from './image-display.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/list' },
  { path: 'list', component: ElementsListComponent },
  { path: 'texte/:texteId', component: TexteDisplayComponent },
  { path: 'texte', pathMatch: 'full', redirectTo: '/list' },
  { path: 'image/:imageId', component: ImageDisplayComponent },
  { path: 'image', pathMatch: 'full', redirectTo: '/list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
