import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { IdService } from './id.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Image } from './image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  images$: BehaviorSubject<Image[]> = new BehaviorSubject<Image[]>([]);
  ImageUrl:string = environment.apiUrl + 'image/';

  constructor(private idService : IdService, private http: HttpClient) {
    this.http.get<Image[]>(this.ImageUrl)
      .subscribe(images => {
        this.images$.next(images);
      });
  }

  addImage(image : Image) : void {
    this.http.post(this.ImageUrl, image)
      .subscribe(data => {
        console.log(data);
        const images = this.images$.getValue();
        images.push(image);
        this.images$.next(images);
      });
  }

  createImage() : Image {
    return {
      id: this.idService.getNewId(),
      name: '',
      src: ''
    }
  }

  editImage(image : Image) {
    this.http.put(this.ImageUrl + image.id, image)
      .subscribe(data => {
        const images = this.images$.getValue();
        const element = this.images$.getValue().find(e => e.id === image.id);
        if (element)
        {
          images[this.images$.getValue().indexOf(element)].name = image.name;
          images[this.images$.getValue().indexOf(element)].src = image.src;
        }
        this.images$.next(images);
      });
  }

  delete(image: Image) : void {
    this.http.delete(this.ImageUrl + image.id)
      .subscribe(data => {
        const images = this.images$.getValue();
        const element = this.images$.getValue().find(e => e.id === image.id);
        if (element)
        {
          images.splice(this.images$.getValue().indexOf(element), 1);
        }
        this.images$.next(images);
      });
  }

  get(id:string): Observable<Image>{
    return this.http.get<Image>(this.ImageUrl + id);
  }

  getListImage() {
    return this.images$;
  }
}
