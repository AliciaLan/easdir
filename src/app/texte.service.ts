import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { IdService } from './id.service';
import { Texte } from './texte.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TexteService {
  textes$: BehaviorSubject<Texte[]> = new BehaviorSubject<Texte[]>([]);
  TexteUrl:string = environment.apiUrl + 'texte/';

  constructor(private idService : IdService, private http: HttpClient) {
    this.http.get<Texte[]>(this.TexteUrl)
      .subscribe(textes => {
        console.log(textes);
        this.textes$.next(textes);
      });
  }

  addTexte(texte : Texte) : void {
    this.http.post(this.TexteUrl, texte)
      .subscribe(data => {
        console.log(data);
        const textes = this.textes$.getValue();
        textes.push(texte);
        this.textes$.next(textes);
      });
  }

  createTexte() : Texte {
    return {
      id: this.idService.getNewId(),
      name: '',
      contenu: ''
    }
  }

  delete(texte: Texte) : void {
    this.http.delete(this.TexteUrl + texte.id)
      .subscribe(data => {
        const textes = this.textes$.getValue();
        textes.splice(textes.indexOf(texte), 1);
        this.textes$.next(textes);
      });
  }

  get(id:string): Observable<Texte>{
    return this.http.get<Texte>(this.TexteUrl + id);
  }

  getListTexte(){
    return this.textes$;
  }
}
