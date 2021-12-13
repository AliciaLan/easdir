import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Dossier } from './dossier.model';
import { IdService } from './id.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DossierService {
  dossiers$: BehaviorSubject<Dossier[]> = new BehaviorSubject<Dossier[]>([]);
  DossierUrl:string = environment.apiUrl + 'dossier/';

  constructor(private idService : IdService, private http: HttpClient) {
    this.http.get<Dossier[]>(this.DossierUrl)
      .subscribe(dossiers => {
        console.log(dossiers);
        this.dossiers$.next(dossiers);
      });
  }

  getListDossier() {
    return this.dossiers$;
  }
}
