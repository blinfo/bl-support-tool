import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '@shared/interfaces/field-config';

@Component({
  selector: 'app-form-radio',
  template: `
    <div [formGroup]="form" class="ml-8 flex flex-col">
      <ng-container *ngFor="let field of config; let i = index">
        <label class="cursor-pointer my-2">
          <input
            class="form-radio text-bl-orange-500 focus:shadow-orange focus:border-bl-orange-500 mr-2"
            type="radio"
            [value]="field.value"
            [formControlName]="field.name"
          />
          <span>{{ field.label }}</span>
        </label>
      </ng-container>
    </div>
  `
})
export class FormRadioComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() config: FieldConfig[];

  constructor() { }

  ngOnInit(): void {
  }

}
