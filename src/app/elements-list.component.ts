import { Component, OnInit } from '@angular/core';
import { Dossier } from './dossier.model';
import { EasdirService } from './easdir.service';
import { Text } from './text.model';

@Component({
  selector: 'easdir-elements-list',
  template: `
    <div id="contenu">
      <div id="contenu-titre">
        <h2>Dossier parent</h2>
        <button id="button-suppr-dossier" type="button">Supprimer le dossier</button>
      </div>

      <div id="contenu-button">
        <button (click)="addDossier()" id="button-add-dossier" type="button">Ajouter un dossier</button>
        <button id="button-add-text" type="button">Ajouter un fichier texte</button>
      </div>

      <div id="contenu-elements">
        <article *ngFor="let dossier of dossiers" class="dossier">
          <img src="../assets/dossier.png">
          <p>{{ dossier.name }}</p>
        </article>
        <article *ngFor="let texte of textes" class="text">
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
  dossiers?: Dossier[] = this.service.getListDossier();
  textes?: Text[] = this.service.getListTexte();

  constructor(private service : EasdirService) { }

  ngOnInit(): void {
  }

  addDossier() {

  }

}
