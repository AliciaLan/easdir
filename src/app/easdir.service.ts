import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Dossier } from './dossier.model';
import { IdService } from './id.service';
import { Text } from './text.model';

@Injectable({
  providedIn: 'root'
})
export class EasdirService {
  dossiers?: Dossier[] = [
    {id:"1", name:"dossier pro"},
    {id:"12", name:"dossier perso"},
    {id:"123", name:"dossier yjdfsfghfsqdbvcds"}
  ];
  textes?: Text[] = [
    {id:"1", name:"fichier pro", contenu:"le fichier 1"},
    {id:"12", name:"fichier perso", contenu:"le fichier 2"}
  ];
  ApiUrl:string = environment.apiUrl + 'contacts/';

  constructor(private idService : IdService) { }

  getListDossier() {
    return this.dossiers;
  }

  getListTexte(){
    return this.textes;
  }
}
