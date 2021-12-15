import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dossier } from './dossier.model';
import { DossierService } from './dossier.service';

@Component({
  selector: 'easdir-dossier-form',
  template: `
    <div id="contenu-form-dossier">
      <form (ngSubmit)="submit()" [formGroup]="dossierForm">
        <div>
          <label>Nom : </label>
          <input formControlName="name">
        </div>
        <input type="submit" [disabled]="dossierForm.invalid" value="Save">
        <input type="button" (click)="cancelForm()" value="Cancel">
      </form>
    </div>
  `,
  styles: ['input.ng-invalid { background: lightcoral }']
})
export class DossierFormComponent implements OnInit {
  @Input() dossier: Dossier = this.service.createDossier();
  @Output() save = new EventEmitter<Dossier>();
  @Output() cancel = new EventEmitter();
  dossierForm: FormGroup;

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
      id: this.dossier.id, ...this.dossierForm.value
    };

    this.save.emit(dossierToSave);
  }

  cancelForm() {
    this.cancel.emit();
  }

}
