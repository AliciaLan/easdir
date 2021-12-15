import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Texte } from './texte.model';
import { TexteService } from './texte.service';

@Component({
  selector: 'easdir-texte-form',
  template: `
    <div id="contenu-form-texte">
      <form (ngSubmit)="submit()" [formGroup]="texteForm">
        <div>
          <label>Nom : </label>
          <input formControlName="name">
        </div>
        <div>
          <label>Contenu : </label>
          <input formControlName="contenu">
        </div>
        <input type="submit" [disabled]="texteForm.invalid" value="Save">
        <input type="button" (click)="cancelForm()" value="Cancel">
      </form>
    </div>
  `,
  styles: ['input.ng-invalid { background: lightcoral }']
})
export class TexteFormComponent implements OnInit {
  @Input() texte: Texte = this.service.createTexte();
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
    this.texteForm.get('name')?.setValue(this.texte?.name);
    this.texteForm.get('contenu')?.setValue(this.texte?.contenu);
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
