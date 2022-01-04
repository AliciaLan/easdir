import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Objet } from './objet.model';
import { ObjetService } from './objet.service';
import { Data } from './data.model';
import { DataService } from './data.service';


@Component({
  selector: 'easdir-file-display',
  template: `
    <div id="display">
      <div id="display-button" >
        <button (click)="backToList()">{{ 'back' | translate }}</button>
        <button *ngIf="!this.EditMode" (click)="ToggleEdit()" id="button-edit" type="button">{{ 'edit' | translate }}</button>
        <button (click)="delete()" id="button-suppr" type="button">{{ 'delete' | translate }}</button>
      </div>

      <div *ngIf="!this.EditMode">
        <h2 id="display-name">{{ this.objet?.name }}</h2>
        <img *ngIf="this.objet?.type == 'image'" id="display-img" src="{{ this.data?.contenue }}">
        <p *ngIf="this.objet?.type == 'texte'" id="display-text"> <pre>{{ this.data?.contenue }}</pre>
      </div>

      <div>
       <easdir-file-edit-form
          *ngIf="this.EditMode"
          [name]="this.objet?.name"
          [data]="this.data?.contenue"
          (cancel)="ToggleEdit()"
          (save)="saveFile($event)">
        </easdir-file-edit-form>
      </div>

      <div id="display-information">
        <h2>{{ 'info' | translate }} :</h2>
        <p>{{ 'dateEdit' | translate }} : {{ this.objet?.last_modification | date:"full" }}</p>
        <p>{{ 'dateAdd' | translate }} : {{ this.objet?.creation | date:"full" }}</p>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ObjetDisplayComponent implements OnInit {
  objet?: Objet;
  data?: Data;
  EditMode: boolean = false;

  constructor(private ObjetService: ObjetService, private DataService: DataService, route: ActivatedRoute, private router: Router) {
    route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('fileId');
      if (id) {
        ObjetService.get(id)
          .subscribe( obj => this.objet = obj,
            () => router.navigate(['/list'])
          )
        DataService.get(id)
          .subscribe(obj => this.data = obj,
            () => router.navigate(['/list'])
          )
      }
    })
  }

  ngOnInit(): void { }

  backToList(): void {
      this.router.navigate(['/list/' + this.objet?.idParent]);
  }

  delete(): void {
    if(this.objet)
      this.ObjetService.delete(this.objet);
    if(this.data)
      this.DataService.delete(this.data);
    this.backToList();
  }

  saveFile(dual: {name: string; data: any;}): void {
    if(this.objet) {
      this.objet.name = dual.name;
      this.ObjetService.update(this.objet.name, this.objet.id);
    }
    if(this.data) {
      this.data.contenue = dual.data;
      this.DataService.update(this.data);
    }
    this.ToggleEdit();
  }

  ToggleEdit(): void {
    this.EditMode = !this.EditMode;
  }
}
