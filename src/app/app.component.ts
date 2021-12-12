import { Component } from '@angular/core';

@Component({
  selector: 'easdir-root',
  template: `
    <header>
      <img id="logo" src="../assets/logo.png">
      <div id="titre">
        <h1>Bienvenue dans <span id="easdir">EasDir</span></h1>
        <h3>Votre nouveau gestionnaire de fichier</h3>
      </div>
    </header>

    <div id="contenu">
      <h2>Dossier parent</h2>
      <div id="elements">
        <article class="dossier">
          <img src="../assets/dossier.png">
          <p>nomedfghjkljhgfdsdfghjnk</p>
        </article>
        <article class="text">
          <img src="../assets/fichier.png">
          <p>nom</p>
        </article>
        <article class="dossier">
          <img src="../assets/dossier.png">
          <p>nom</p>
        </article>
        <article class="text">
          <img src="../assets/fichier.png">
          <p>nom</p>
        </article>
        <article class="dossier">
          <img src="../assets/dossier.png">
          <p>nom</p>
        </article>
        <article class="text">
          <img src="../assets/fichier.png">
          <p>nom</p>
        </article>
        <article class="dossier">
          <img src="../assets/dossier.png">
          <p>nom</p>
        </article>
        <article class="text">
          <img src="../assets/fichier.png">
          <p>nom</p>
        </article>
        <article class="dossier">
          <img src="../assets/dossier.png">
          <p>nom</p>
        </article>
        <article class="text">
          <img src="../assets/fichier.png">
          <p>nom</p>
        </article>
        <router-outlet></router-outlet>
      </div>
    </div>

    <footer>
      <p class="text-footer">Site Web développé en Angular JS dans le cadre d'un projet d'étude.</p>
      <p class="text-footer">Projet réalisé par LAN Alicia et MUSOLES Hugo</p>
    </footer>
  `,
  styles: [``]
})
export class AppComponent {
  title = 'EasDir';
}
