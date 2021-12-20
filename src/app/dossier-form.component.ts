import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dossier } from './dossier.model';
import { DossierService } from './dossier.service';

@Component({
  selector: 'easdir-dossier-form',
  template: `
    <article>
      <form (ngSubmit)="submit()" [formGroup]="dossierForm">
        <img src="../assets/dossier.png">
        <input formControlName="name" placeholder="Nom">
        <div id="button-form">
          <button type="submit" [disabled]="dossierForm.invalid">Ajouter</button>
          <button type="button" (click)="cancelForm()">Annuler</button>
        </div>
      </form>
    </article>
  `,
  styles: ['input.ng-invalid { background: lightcoral }']
})
export class DossierFormComponent implements OnInit {
  @Input() dossier: Dossier = this.service.createDossier();
  @Output() save = new EventEmitter<Dossier>();
  @Output() cancel = new EventEmitter();
  
  dossierForm: FormGroup;
  date: number = Date.now();

  constructor(private service: DossierService) {
    this.dossierForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.dossierForm.get('name')?.setValue(this.dossier?.name);
  }

  submit() {
    const dossierToSave: Dossier = {
      id: this.dossier.id,
      ...this.dossierForm.value,
      last_modification: this.date
    };

    this.save.emit(dossierToSave);
  }

  cancelForm() {
    this.cancel.emit();
  }

}
