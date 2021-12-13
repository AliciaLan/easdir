import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Dossier } from './dossier.model';
import { IdService } from './id.service';
import { Text } from './text.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EasdirService {
  dossiers$: BehaviorSubject<Dossier[]> = new BehaviorSubject<Dossier[]>([]);
  textes$: BehaviorSubject<Text[]> = new BehaviorSubject<Text[]>([]);

  DossierUrl:string = environment.apiUrl + 'dossier/';
  TexteUrl:string = environment.apiUrl + 'text/';

  constructor(private idService : IdService, private http: HttpClient) {
    this.http.get<Dossier[]>(this.DossierUrl)
      .subscribe(dossiers => {
        console.log(dossiers);
        this.dossiers$.next(dossiers);
      });

    this.http.get<Text[]>(this.TexteUrl)
      .subscribe(textes => {
        console.log(textes);
        this.textes$.next(textes);
      });
  }

  getListDossier() {
    return this.dossiers$;
  }

  getListTexte(){
    return this.textes$;
  }
}
