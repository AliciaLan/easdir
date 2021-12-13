import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'easdir-elements-list',
  template: `
    <div id="contenu">
      <div id="contenu-titre">
        <h2>Dossier parent</h2>
        <button id="button-suppr-dossier" type="button">Supprimer le dossier</button>
      </div>

      <div id="contenu-button">
        <button id="button-add-dossier" type="button">Ajouter un dossier</button>
        <button id="button-add-text" type="button">Ajouter un fichier texte</button>
      </div>

      <div id="contenu-elements">
        <article class="dossier">
          <img src="../assets/dossier.png">
            <p>nomedfghjkljhgfdsjnk</p>
          </article>
        <article class="text">
          <img src="../assets/fichier.png">
            <p>nom</p>
        </article>
        <article class="text">
          <img src="../assets/fichier.png">
            <p>nom</p>
        </article>
        <article class="text">
          <img src="../assets/fichier.png">
            <p>nom</p>
        </article>
        <article class="text">
          <img src="../assets/fichier.png">
            <p>nom</p>
        </article>
        <article class="text">
          <img src="../assets/fichier.png">
            <p>nom</p>
        </article>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ElementsListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
