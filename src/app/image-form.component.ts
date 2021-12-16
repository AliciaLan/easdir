import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Image } from './image.model';
import { ImageService } from './image.service';

@Component({
  selector: 'easdir-image-form',
  template: `
    <article>
      <form (ngSubmit)="submit()" [formGroup]="imageForm">
        <img src="../assets/image.png">
        <input formControlName="name">
        <input formControlName="src">
        <div>
          <button type="submit" [disabled]="imageForm.invalid">Ajouter</button>
          <button type="button" (click)="cancelForm()">Annuler</button>
        </div>
      </form>
    </article>
  `,
  styles: ['input.ng-invalid { background: lightcoral }']
})
export class ImageFormComponent implements OnInit {
  image: Image = this.service.createImage();
  @Output() save = new EventEmitter<Image>();
  @Output() cancel = new EventEmitter();
  imageForm: FormGroup;

  constructor(private service: ImageService) {
    this.imageForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      src: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  submit() {
    const imageToSave: Image = {
      id: this.image.id, ...this.imageForm.value
    };

    this.save.emit(imageToSave);
  }

  cancelForm() {
    this.cancel.emit();
  }

}
