import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Image } from './image.model';
import { ImageService } from './image.service';

@Component({
  selector: 'easdir-image-display',
  template: `
    <div id="display">
      <div id="display-button">
        <button (click)="backToList()">Retour</button>
        <button id="button-edit" type="button">Modifier l'image</button>
        <button (click)="delete()" id="button-suppr" type="button">Supprimer le fichier</button>
      </div>

      <div>
        <h2 id="image-name">{{ this.image?.name }}</h2>
        <img id="image-src" src="{{ this.image?.src }}">
      </div>
    </div>
  `,
  styles: [
  ]
})
export class ImageDisplayComponent implements OnInit {
  image?: Image;

  constructor(private ImageService: ImageService, route: ActivatedRoute, private router: Router) {
    route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        const id = paramMap.get('imageId');
        if (id) {
          ImageService.get(id)
            .subscribe(
              image => this.image = image,
              () => router.navigate(['/list'])
            )
        }
      }
    )
  }

  ngOnInit(): void {
  }

  backToList() : void {
      this.router.navigate(['/list']);
  }

  delete() : void {
    if(this.image){
      this.ImageService.delete(this.image);
      this.backToList();
    }
  }

}
