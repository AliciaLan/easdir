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
        <button *ngIf="!this.EditMode" (click)="ToggleEdit()" id="button-edit" type="button">Modifier l'image</button>
        <button (click)="delete()" id="button-suppr" type="button">Supprimer le fichier</button>
      </div>

      <div *ngIf="!this.EditMode">
        <h2 id="display-name">{{ this.image?.name }}</h2>
        <img id="display-src" src="{{ this.image?.src }}">
      </div>

      <div>
        <easdir-image-edit-form
          *ngIf="this.EditMode && this.image"
          [image]="this.image"
          (cancel)="ToggleEdit()"
          (save)="saveImage($event)">
        </easdir-image-edit-form>
      </div>

      <p id="display-date">Dernière modification : {{ this.image?.last_modification | date:"full" }}</p>
    </div>
  `,
  styles: [
  ]
})
export class ImageDisplayComponent implements OnInit {
  image?: Image;
  EditMode: boolean = false;

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

  saveImage(image : Image) {
    this.ImageService.editImage(image);
    this.backToList();
  }

  ToggleEdit() {
    this.EditMode = !this.EditMode;
  }

}
