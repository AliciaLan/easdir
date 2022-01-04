import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { IdService } from './id.service';
import { Objet } from './objet.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjetService {
  objets$: BehaviorSubject<Objet[]> = new BehaviorSubject<Objet[]>([]);
  url: string = environment.apiUrl + 'objet/';

  constructor(private idService: IdService, private http: HttpClient) {
    this.http.get<Objet[]>(this.url)
      .subscribe(objet => this.objets$.next(objet));
  }

  add(objet: Objet) : void {
    this.http.post(this.url, objet)
      .subscribe(data => {
        const objets = this.objets$.getValue();
        objets.push(objet);
        this.objets$.next(objets);
      });
  }

  create() : Objet {
    return {
      id: this.idService.getNewId(),
      name: '',
      type:'',
      last_modification: 0,
      creation: Date.now(),
      idParent: ''
    }
  }

  edit(objet : Objet):void {
    objet.last_modification = Date.now()
    this.http.put(this.url + objet.id, objet)
      .subscribe(data => {
        const objets = this.objets$.getValue();
        const element = this.objets$.getValue().find(e => e.id === objet.id);

        if (element) {
          objets[this.objets$.getValue().indexOf(element)].name = objet.name;
          objets[this.objets$.getValue().indexOf(element)].last_modification = objet.last_modification;
        }

        this.objets$.next(objets);
      });
  }

  delete(objet: Objet) : void {
    this.http.delete(this.url + objet.id)
      .subscribe(data => {
        const objets = this.objets$.getValue();
        const element = this.objets$.getValue().find(e => e.id === objet.id);

        if (element) {
          objets.splice(this.objets$.getValue().indexOf(element), 1);
        }

        this.http.get<Objet[]>(this.url + '?idParent=' + objet.id)
          .subscribe((data : Objet[]) => data.forEach((item: Objet) => this.delete(item)));

        this.objets$.next(objets);
      });
  }

  update(name: string, id: string)
  {
    this.http.patch(this.url + id, {name: name, last_modification:Date.now()})
    .subscribe(data => {
      const objets = this.objets$.getValue();
      const element = this.objets$.getValue().find(e => e.id === id);

      if (element) {
        objets[this.objets$.getValue().indexOf(element)].name = name;
        objets[this.objets$.getValue().indexOf(element)].last_modification = Date.now();
      }

      this.objets$.next(objets);
    });
  }

  get(id?: string) : Observable<Objet> {
    if(id && id != 'null')
      return this.http.get<Objet>(this.url + id);
    else
      return new Observable(od => od.next({id:'', name:'Dossier racine', type:'dossier', last_modification:0, creation:0, idParent:''}));
  }

  getList() : BehaviorSubject<Objet[]> {
    return this.objets$;
  }
}
