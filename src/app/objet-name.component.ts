import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'easdir-objet-name',
  template: `
      <form (ngSubmit)="submit()" [formGroup]="objetForm">
        <input formControlName="name" placeholder="Nom">
        <div id="button-form">
          <button type="submit" [disabled]="objetForm.invalid">Modifier</button>
          <button type="button" (click)="cancelForm()">Cancel</button>
        </div>
      </form>

  `,
  styles: ['input.ng-invalid { background: lightcoral }']
})
export class ObjetNameComponent implements OnInit {
  @Input() name: string = '';
  @Output() save = new EventEmitter<string>();
  @Output() cancel = new EventEmitter();
  objetForm: FormGroup;
  constructor() {
    this.objetForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.objetForm.get('name')?.setValue(this.name);
  }

  submit() {
    if(this.name)
    {
      const tosave: string = this.objetForm.get('name')?.value
      this.save.emit(tosave);
    }
    else
    {
      this.cancel.emit();
    }
  }

  cancelForm() {
    this.cancel.emit();
  }

}
