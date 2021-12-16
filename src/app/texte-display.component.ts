import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Texte } from './texte.model';
import { TexteService } from './texte.service';

@Component({
  selector: 'easdir-texte-display',
  template: `
  <div id="display">
    <div id="display-button">
      <button (click)="backToList()">Retour</button>
      <button (click)="delete()" id="button-suppr" type="button">Supprimer le fichier</button>
    </div>

    <div *ngIf="!this.EditMode">
      <h2 id="texte-name">{{ this.texte?.name }}</h2>
      <p id="texte-contenu">{{ this.texte?.contenu }}</p>
      <button (click)="ToggleEdit()" id="button-edit" type="button">Modifier le fichier</button>
    </div>

    <div>
      <easdir-texte-edit-form
        *ngIf="this.EditMode && this.texte"
        [texte]="this.texte"
        (cancel)="ToggleEdit()"
        (save)="saveTexte($event)">
      </easdir-texte-edit-form>
    </div>
  </div>
  `,
  styles: []
})
export class TexteDisplayComponent implements OnInit {
  texte?: Texte;

  EditMode: boolean = false;

  constructor(private TexteService: TexteService, route: ActivatedRoute, private router: Router) {
    route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        const id = paramMap.get('texteId');
        if (id) {
          TexteService.get(id)
            .subscribe(
              texte => this.texte = texte,
              () => router.navigate(['/list'])
            )
        }
      }
    )
  }

  ngOnInit(): void {
  }

  backToList() : void {
      this.router.navigate(['/list']);
  }

  delete() : void {
    if(this.texte){
      this.TexteService.delete(this.texte);
      this.backToList();
    }
  }

  saveTexte(texte : Texte) {
    this.TexteService.editTexte(texte);
    this.backToList();
  }

  ToggleEdit() {
    this.EditMode = !this.EditMode;
  }

}
