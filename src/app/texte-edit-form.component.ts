import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Texte } from './texte.model';
import { TexteService } from './texte.service';

@Component({
  selector: 'easdir-texte-edit-form',
  template: `
    <div id="display-edit-form">
      <form (ngSubmit)="submit()" [formGroup]="texteForm">
        <input id="display-name" formControlName="name" placeholder="Nom">
        <input id="display-contenu" formControlName="contenu" placeholder="Contenu">
        <div>
          <button type="submit" [disabled]="texteForm.invalid">Modifier</button>
          <button type="button" (click)="cancelForm()">Annuler</button>
        </div>
      </form>
    </div>
  `,
  styles: [
  ]
})
export class TexteEditFormComponent implements OnInit {
  @Input() texte: Texte = this.service.createTexte();
  @Output() save = new EventEmitter<Texte>();
  @Output() cancel = new EventEmitter();

  texteForm: FormGroup;
  date: number = Date.now();

  constructor(private service: TexteService) {
    this.texteForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      contenu: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.texteForm.get('name')?.setValue(this.texte?.name);
    this.texteForm.get('contenu')?.setValue(this.texte?.contenu);
  }

  submit() {
    const texteToSave: Texte = {
      id: this.texte.id,
      ...this.texteForm.value,
      last_modification: this.date
    };

    this.save.emit(texteToSave);
  }

  cancelForm() {
    this.cancel.emit();
  }

}
