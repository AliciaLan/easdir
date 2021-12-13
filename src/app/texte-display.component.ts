import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EasdirService } from './easdir.service';
import { Text } from './text.model';

@Component({
  selector: 'easdir-texte-display',
  template: `
  <div id="texte">
    <div id="texte-button">
      <button (click)="backToList()">Retour</button>
      <button id="button-edit" type="button">Modifier le fichier</button>
      <button id="button-suppr" type="button">Supprimer le fichier</button>
    </div>
    <h2 id="texte-name">{{ this.texte?.name }}</h2>
    <p id="texte-contenu">{{ this.texte?.contenu }}</p>
  </div>
  `,
  styles: []
})
export class TexteDisplayComponent implements OnInit {
  texte?: Text;

  constructor(service: EasdirService, route: ActivatedRoute, private router: Router) {
    route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        const id = paramMap.get('texteId');
        if (id) {
          service.get(id)
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

  backToList() {
      this.router.navigate(['/list']);
  }

}
