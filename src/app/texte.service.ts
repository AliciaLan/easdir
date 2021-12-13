import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { IdService } from './id.service';
import { Text } from './text.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TexteService {
  textes$: BehaviorSubject<Text[]> = new BehaviorSubject<Text[]>([]);
  TexteUrl:string = environment.apiUrl + 'texte/';

  constructor(private idService : IdService, private http: HttpClient) {
    this.http.get<Text[]>(this.TexteUrl)
      .subscribe(textes => {
        console.log(textes);
        this.textes$.next(textes);
      });
  }

  get(id:string): Observable<Text>{
    return this.http.get<Text>(this.TexteUrl + id);
  }

  getListTexte(){
    return this.textes$;
  }
}
