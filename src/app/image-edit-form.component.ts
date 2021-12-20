import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Image } from './image.model';
import { ImageService } from './image.service';

@Component({
  selector: 'easdir-image-edit-form',
  template: `
    <div id="display-edit-form">
      <form (ngSubmit)="submit()" [formGroup]="imageForm">
        <input id="display-name" formControlName="name" placeholder="Nom">
        <input id="display-contenu" formControlName="src" placeholder="Lien">
        <div>
          <button type="submit" [disabled]="imageForm.invalid">Modifier</button>
          <button type="button" (click)="cancelForm()">Annuler</button>
        </div>
      </form>
    </div>
  `,
  styles: [
  ]
})
export class ImageEditFormComponent implements OnInit {
  @Input() image: Image = this.service.createImage();
  @Output() save = new EventEmitter<Image>();
  @Output() cancel = new EventEmitter();

  imageForm: FormGroup;
  date: number = Date.now();

  constructor(private service: ImageService) {
    this.imageForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      src: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.imageForm.get('name')?.setValue(this.image?.name);
    this.imageForm.get('src')?.setValue(this.image?.src);
  }

  submit() {
    const imageToSave: Image = {
      id: this.image.id,
      ...this.imageForm.value,
      last_modification: this.date
    };

    this.save.emit(imageToSave);
  }

  cancelForm() {
    this.cancel.emit();
  }

}
