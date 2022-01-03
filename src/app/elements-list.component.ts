import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Objet } from './objet.model';
import { ObjetService } from './objet.service';
import { DataService } from './data.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'easdir-elements-list',
  template: `
    <div id="contenu">
      <div id="contenu-titre">
        <h2>{{ this.objet?.name }}</h2>
      </div>

      <div id="contenu-button">
        <button (click)="ToggleAddDossierMode()" type="button">Ajouter un dossier</button>
        <button (click)="ToggleAddTexteMode()" type="button">Ajouter un fichier texte</button>
        <button (click)="ToggleAddImageMode()" type="button">Ajouter une image</button>
      </div>

      <div id="contenu-elements">
        <article class="dossier" *ngIf="this.objet?.id != ''">
          <img src="../assets/dossier.png" [routerLink]="['/list', objet?.idParent]">
          <p>Retour</p>
        </article>

        <ng-container *ngFor="let one of objets$ | async">
          <article class="dossier" *ngIf="one.idParent === this.objet?.id">
            <img *ngIf="one.type == 'dossier'" src="../assets/dossier.png" [routerLink]="['/list', one.id]">
            <img *ngIf="one.type == 'texte'" src="../assets/texte.png" [routerLink]="['/file', one.id]">
            <img *ngIf="one.type == 'image'" src="../assets/image.png" [routerLink]="['/file', one.id]">
            <p *ngIf="changeName != one.id" (dblclick)="changeNameFn(one.id)">{{ one.name }}</p>
            <easdir-objet-name
              *ngIf="changeName == one.id"
              name="{{ one.name }}"
              (cancel)="changeNameFn('')"
              (save)="saveName($event, one.id)">
            </easdir-objet-name>
            <button *ngIf="changeName != one.id && one.id != this.objet?.idParent" (click)="remove(one)" id="button-suppr" type="button">Supprimer</button>
          </article>
        </ng-container>

        <easdir-objet-form
          *ngIf="this.AddDossierMode"
          type="dossier"
          idParent="{{ this.objet?.id }}"
          (cancel)="ToggleAddDossierMode()"
          (save)="saveDossier($event)">
        </easdir-objet-form>

        <easdir-objet-form
          *ngIf="this.AddImageMode"
          type="image"
          idParent="{{ this.objet?.id }}"
          (cancel)="ToggleAddImageMode()"
          (save)="saveImage($event)">
        </easdir-objet-form>

        <easdir-objet-form
          *ngIf="this.AddTexteMode"
          type="texte"
          idParent="{{ this.objet?.id }}"
          (cancel)="ToggleAddTexteMode()"
          (save)="saveTexte($event)">
        </easdir-objet-form>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ElementsListComponent implements OnInit {
  objet?: Objet;
  objets$: Observable<Objet[]> = this.ObjetService.getList();
  AddTexteMode: boolean = false;
  AddDossierMode: boolean = false;
  AddImageMode: boolean = false;
  changeName: string = '';

  constructor(private ObjetService: ObjetService, private DataService: DataService, route: ActivatedRoute, private router: Router) {
    route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('dossierId');
      if (id != null) {
        this.ObjetService.get(id)
          .subscribe(dossier => this.objet = dossier,
            () => router.navigate(['/list/'])
          )
      }
    })
  }

  ngOnInit(): void { }

  changeNameFn(id: string) {
    this.changeName = id;
  }

  oky(data: any) {
    console.log(data)
    return true
  }

  remove(objet: Objet) {
    this.ObjetService.delete(objet)
    this.DataService.delete({id:objet.id,contenue:''})
  }

  saveDossier(dossier: Objet) {
    this.ObjetService.add(dossier);
    this.ToggleAddDossierMode();
  }

  saveImage(image: Objet) {
    this.ObjetService.add(image);
    this.DataService.add({id:image.id,contenue:''})
    this.ToggleAddImageMode();
  }

  saveName(name: string, id: string) {
    this.ObjetService.update(name, id)
    this.changeNameFn('')
  }

  saveTexte(texte: Objet) {
    this.ObjetService.add(texte);
    this.DataService.add({id:texte.id, contenue:''})
    this.ToggleAddTexteMode();
  }

  ToggleAddDossierMode() {
    this.AddTexteMode = false;
    this.AddImageMode = false;
    this.AddDossierMode = !this.AddDossierMode;
  }

  ToggleAddImageMode() {
    this.AddDossierMode = false;
    this.AddTexteMode = false;
    this.AddImageMode = !this.AddImageMode;
  }

  ToggleAddTexteMode() {
    this.AddDossierMode = false;
    this.AddImageMode = false;
    this.AddTexteMode = !this.AddTexteMode;
  }
}
