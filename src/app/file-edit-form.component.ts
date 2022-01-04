import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'easdir-file-edit-form',
  template: `
    <div id="display-edit-form">
      <form (ngSubmit)="submit()" [formGroup]="fileForm">
        <input id="display-name" formControlName="name" placeholder="{{ 'name' | translate }}">
        <input id="display-data" formControlName="data" placeholder="{{ 'content' | translate }}">

        <div>
          <button type="submit" [disabled]="fileForm.invalid">{{ 'edit' | translate }}</button>
          <button type="button" (click)="cancelForm()">{{ 'cancel' | translate }}</button>
        </div>
      </form>
    </div>
  `,
  styles: [
  ]
})
export class ObjetEditFormComponent implements OnInit {
  @Input() name?: string;
  @Input() data?: string;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter();

  fileForm: FormGroup;
  date: number = Date.now();

  constructor() {
    this.fileForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      data: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.fileForm.get('name')?.setValue(this.name);
    this.fileForm.get('data')?.setValue(this.data);
  }

  cancelForm(): void {
    this.cancel.emit();
  }

  submit(): void {
    const fileToSave = {
      name: this.fileForm.get('name')?.value,
      data: this.fileForm.get('data')?.value
    };

    this.save.emit(fileToSave);
  }
}
