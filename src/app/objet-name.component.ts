import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'easdir-objet-name',
  template: `
    <form (ngSubmit)="submit()" [formGroup]="objetForm">
      <input formControlName="name" placeholder="{{ 'name' | translate }}">

      <div id="button-form">
        <button type="submit" [disabled]="objetForm.invalid">{{ 'edit' | translate }}</button>
        <button type="button" (click)="cancelForm()">{{ 'cancel' | translate }}</button>
      </div>
    </form>
  `,
  styles: [
  ]
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

  cancelForm(): void {
    this.cancel.emit();
  }

  submit(): void {
    if(this.name) {
      const tosave: string = this.objetForm.get('name')?.value;
      this.save.emit(tosave);
    } else {
      this.cancel.emit();
    }
  }
}
