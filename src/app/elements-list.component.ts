import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Dossier } from './dossier.model';
import { DossierService } from './dossier.service';
import { Texte } from './texte.model';
import { TexteService } from './texte.service';
import { Image } from './image.model';
import { ImageService } from './image.service';

@Component({
  selector: 'easdir-elements-list',
  template: `
    <div id="contenu">
      <div id="contenu-titre">
        <h2>Dossier parent</h2>
        <button id="button-suppr" type="button">Supprimer le dossier</button>
      </div>

      <div id="contenu-button">
        <button (click)="ToggleAddDossierMode()" type="button">Ajouter un dossier</button>
        <button (click)="ToggleAddTexteMode()" type="button">Ajouter un fichier texte</button>
        <button (click)="ToggleAddImageMode()" type="button">Ajouter une image</button>
      </div>

      <div id="contenu-elements">
        <article *ngFor="let dossier of dossiers$ | async" class="dossier">
          <img src="../assets/dossier.png">
          <p>{{ dossier.name }}</p>
        </article>

        <easdir-dossier-form
        *ngIf="this.AddDossierMode"
        (cancel)="ToggleAddDossierMode()"
        (save)="saveDossier($event)">
        </easdir-dossier-form>

        <article
          *ngFor="let texte of textes$ | async"
          [routerLink]="['/texte', texte.id]">
            <img src="../assets/texte.png">
            <p>{{ texte.name }}</p>
        </article>

        <easdir-texte-form
          *ngIf="this.AddTexteMode"
          (cancel)="ToggleAddTexteMode()"
          (save)="saveTexte($event)">
        </easdir-texte-form>

        <article
          *ngFor="let image of images$ | async"
          [routerLink]="['/image', image.id]">
            <img src="../assets/image.png">
            <p>{{ image.name }}</p>
        </article>

        <easdir-image-form
          *ngIf="this.AddImageMode"
          (cancel)="ToggleAddImageMode()"
          (save)="saveImage($event)">
        </easdir-image-form>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ElementsListComponent implements OnInit {
  dossiers$: Observable<Dossier[]> = this.DossierService.getListDossier();
  textes$: Observable<Texte[]> = this.TexteService.getListTexte();
  images$: Observable<Image[]> = this.ImageService.getListImage();

  AddTexteMode: boolean = false;
  AddDossierMode: boolean = false;
  AddImageMode: boolean = false;

  constructor(private DossierService : DossierService, private TexteService : TexteService, private ImageService : ImageService) {
  }

  ngOnInit(): void {
  }

  saveDossier(dossier : Dossier) {
    this.DossierService.addDossier(dossier);
    this.ToggleAddDossierMode();
  }

  saveImage(image : Image) {
    this.ImageService.addImage(image);
    this.ToggleAddImageMode();
  }

  saveTexte(texte : Texte) {
    this.TexteService.addTexte(texte);
    this.ToggleAddTexteMode();
  }

  ToggleAddDossierMode(){
    this.AddTexteMode = false;
    this.AddImageMode = false;
    this.AddDossierMode = !this.AddDossierMode;
  }

  ToggleAddImageMode(){
    this.AddDossierMode = false;
    this.AddTexteMode = false;
    this.AddImageMode = !this.AddImageMode;
  }

  ToggleAddTexteMode(){
    this.AddDossierMode = false;
    this.AddImageMode = false;
    this.AddTexteMode = !this.AddTexteMode;
  }

}
