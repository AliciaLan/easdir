import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Objet } from './objet.model';
import { ObjetService } from './objet.service';

@Component({
  selector: 'easdir-objet-form',
  inputs: ['type','idParent'],
  template: `
    <article>
      <form (ngSubmit)="submit()" [formGroup]="objetForm">
        <img *ngIf="type == 'dossier'" src="../assets/dossier.png">
        <img *ngIf="type == 'image'" src="../assets/image.png">
        <img *ngIf="type == 'texte'" src="../assets/texte.png">
        <input formControlName="name" placeholder="{{ 'name' | translate }}">

        <div id="button-form">
          <button type="submit" [disabled]="objetForm.invalid">{{ 'add' | translate }}</button>
          <button type="button" (click)="cancelForm()">{{ 'cancel' | translate }}</button>
        </div>
      </form>
    </article>
  `,
  styles: ['input.ng-invalid { background: lightcoral }']
})
export class ObjetFormComponent implements OnInit {
  @Input() objet: Objet = this.service.create();
  @Output() save = new EventEmitter<Objet>();
  @Output() cancel = new EventEmitter();

  type?: string;
  idParent?: string;
  objetForm: FormGroup;

  constructor(private service: ObjetService) {
    this.objetForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.objetForm.get('name')?.setValue(this.objet?.name);
  }

  cancelForm(): void {
    this.cancel.emit();
  }

  submit(): void {
    if(this.type) {
      const tosave: Objet = {
        id: this.objet.id,
        ...this.objetForm.value,
        type:this.type,
        idParent:this.idParent,
        creation: this.objet.creation,
        last_modification: Date.now()
      };
      this.save.emit(tosave);
    } else {
      this.cancel.emit();
    }
  }
}
