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

  getListImage() {
    return this.images$;
  }
}
