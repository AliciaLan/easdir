import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Data } from './data.model';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string = environment.apiUrl + 'data/';

  constructor(private http: HttpClient) { }

  add(data: Data): void {
    this.http.post(this.url, data).subscribe();
  }

  update(data: Data): void {
    this.http.put(this.url + data.id, data).subscribe();
  }

  delete(data: Data): void {
    this.http.delete(this.url + data.id).subscribe();
  }

  get(id:string): Observable<Data> {
    return this.http.get<Data>(this.url + id);
  }
}
