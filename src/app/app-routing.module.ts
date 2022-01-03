import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementsListComponent } from './elements-list.component';
import { ObjetDisplayComponent } from './file-display.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/list/' },
  { path: 'list', pathMatch: 'full', redirectTo: '/list/' },
  { path: 'list/:dossierId', component: ElementsListComponent },
  { path: 'file/:fileId', component: ObjetDisplayComponent },
  { path: 'file', pathMatch: 'full', redirectTo: '/list/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
