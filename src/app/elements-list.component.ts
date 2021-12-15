import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dossier } from './dossier.model';
import { DossierService } from './dossier.service';
import { Texte } from './texte.model';
import { TexteService } from './texte.service';

@Component({
  selector: 'easdir-elements-list',
  template: `
    <div id="contenu">
      <div id="contenu-titre">
        <h2>Dossier parent</h2>
        <button id="button-suppr" type="button">Supprimer le dossier</button>
      </div>

      <div id="contenu-button">
        <button id="button-add-dossier" type="button">Ajouter un dossier</button>
        <button (click)="ToggleAddTexteMode()" id="button-add-texte" type="button">Ajouter un fichier texte</button>
      </div>

      <easdir-texte-form
        *ngIf="this.AddTexteMode"
        (cancel)="ToggleAddTexteMode()"
        (save)="saveTexte($event)">
      </easdir-texte-form>

      <div id="contenu-elements">
        <article *ngFor="let dossier of dossiers$ | async" class="dossier">
          <img src="../assets/dossier.png">
          <p>{{ dossier.name }}</p>
        </article>
        <article
          *ngFor="let texte of textes$ | async"
          [routerLink]="['/texte', texte.id]"
          class="text">
            <img src="../assets/fichier.png">
            <p>{{ texte.name }}</p>
        </article>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ElementsListComponent implements OnInit {
  dossiers$: Observable<Dossier[]> = this.DossierService.getListDossier();
  textes$: Observable<Texte[]> = this.TexteService.getListTexte();

  AddTexteMode: boolean = false;

  constructor(private DossierService : DossierService, private TexteService : TexteService) {
  }

  ngOnInit(): void {
  }

  saveTexte(texte : Texte) {
    this.TexteService.addTexte(texte);
  }

  ToggleAddTexteMode(){
    this.AddTexteMode = !this.AddTexteMode;
    console.log(this.AddTexteMode);
  }

}
