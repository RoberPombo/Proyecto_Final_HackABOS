import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: ['./autocomplete-field.component.scss']
})
export class AutocompleteFieldComponent implements OnInit {

  @Input() parentForm: FormGroup;
  // Example ['nameField',[options for autocomplete(string[])], 'required', 'range(0,10)', 'length(3,10)', 'pattern(regxPattern)']
  @Input() settingsField: any[];

  formGroup: FormGroup;
  formControl: FormControl;
  nameField: string;
  translateNameField: string;
  min: number;
  max: number;

  constructor() { }

  ngOnInit() {
    this.nameField = this.settingsField[0];
    this.translateNameField = `formFields.${this.nameField}`;

    this.formGroup = new FormGroup({});
    this.formControl = new FormControl('');

    if (this.settingsField.indexOf('required') !== -1) {
      this.formControl.setValidators(Validators.required);
    }
    this.settingsField.forEach(setting => {
      if (setting.includes('pattern')) {
        const pattern = setting.slice(8, setting.length - 1);
        this.formControl.setValidators(Validators.pattern(pattern));
      }
      if (setting.includes('range')) {
        const [min, max] = setting.slice(6, setting.length - 1).split(',');
        this.min = +min;
        this.max = +max;
        this.formControl.setValidators([Validators.min(this.min), Validators.max(this.max)]);
      }
      if (setting.includes('length')) {
        const [min, max] = setting.slice(7, setting.length - 1).split(',');

        this.min = +min;
        this.max = +max;
        this.formControl.setValidators([Validators.minLength(this.min), Validators.maxLength(this.max)]);
      }
    });

    this.formGroup.addControl(this.nameField, this.formControl);

    this.parentForm.addControl(this.nameField, this.formGroup);
  }
}
