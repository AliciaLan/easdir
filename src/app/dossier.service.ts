import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Dossier } from './dossier.model';
import { IdService } from './id.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DossierService {
  dossiers$: BehaviorSubject<Dossier[]> = new BehaviorSubject<Dossier[]>([]);
  DossierUrl: string = environment.apiUrl + 'dossier/';

  constructor(private idService : IdService, private http: HttpClient) {
    this.http.get<Dossier[]>(this.DossierUrl)
      .subscribe(dossiers => {
        this.dossiers$.next(dossiers);
      });
  }

  addDossier(dossier : Dossier) : void {
    this.http.post(this.DossierUrl, dossier)
      .subscribe(data => {
        const dossiers = this.dossiers$.getValue();
        dossiers.push(dossier);
        this.dossiers$.next(dossiers);
      });
  }

  createDossier() : Dossier {
    return {
      id: this.idService.getNewId(),
      name: '',
      child: []
    }
  }

  getListDossier() {
    return this.dossiers$;
  }
}
