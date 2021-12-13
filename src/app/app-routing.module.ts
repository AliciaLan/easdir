import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementsListComponent } from './elements-list.component';
import { TexteDisplayComponent } from './texte-display.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/list' },
  { path: 'list', component: ElementsListComponent },
  { path: 'texte/:texteId', component: TexteDisplayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
