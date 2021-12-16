import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Texte } from './texte.model';
import { TexteService } from './texte.service';

@Component({
  selector: 'easdir-texte-form',
  template: `
    <article>
      <form (ngSubmit)="submit()" [formGroup]="texteForm">
        <img src="../assets/texte.png">
        <input formControlName="name">
        <div>
          <button type="submit" [disabled]="texteForm.invalid">Ajouter</button>
          <button type="button" (click)="cancelForm()">Annuler</button>
        </div>
      </form>
    </article>
  `,
  styles: ['input.ng-invalid { background: lightcoral }']
})
export class TexteFormComponent implements OnInit {
  texte: Texte = this.service.createTexte();
  @Output() save = new EventEmitter<Texte>();
  @Output() cancel = new EventEmitter();
  texteForm: FormGroup;

  constructor(private service: TexteService) {
    this.texteForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      contenu: new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

  submit() {
    const texteToSave: Texte = {
      id: this.texte.id, ...this.texteForm.value
    };

    this.save.emit(texteToSave);
  }

  cancelForm() {
    this.cancel.emit();
  }
}
