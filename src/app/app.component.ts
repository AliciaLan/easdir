import { Component } from '@angular/core';

@Component({
  selector: 'easdir-root',
  template: `
    <header class="{{ classColor }}">
      <img id="logo" src="../assets/logo.png">
      <div id="titre">
        <h1>Bienvenue dans <span id="easdir">EasDir</span></h1>
        <h3>Votre nouveau gestionnaire de fichier</h3>
      </div>
      <div id="colorMode">
        <img
          src="https://cdn-icons-png.flaticon.com/512/39/39857.png"
          *ngIf="this.classColor == 'clair'"
          (click)="ToggleColorMode()"
          class="{{ classColor }}">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD8I86HR8yoWpLCFAqa40BC0yn6AsU9e_pXg&usqp=CAU"
          *ngIf="this.classColor == 'sombre'"
          (click)="ToggleColorMode()"
          class="{{ classColor }}">
      </div>
    </header>

    <router-outlet></router-outlet>

    <footer class="{{ classColor }}">
      <p class="text-footer">Site Web développé en Angular JS dans le cadre d'un projet d'étude.</p>
      <p class="text-footer">Projet réalisé par LAN Alicia et MUSOLES Hugo</p>
    </footer>
  `,
  styles: [``]
})
export class AppComponent {
  classColor: string = "clair";
  title = 'EasDir';

  ToggleColorMode() {
    if(this.classColor == "clair") {
      this.classColor = "sombre";
    } else {
      this.classColor = "clair";
    }
  }
}
