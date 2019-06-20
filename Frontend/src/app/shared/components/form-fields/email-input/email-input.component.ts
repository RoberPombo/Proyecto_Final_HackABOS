import { Component, OnInit, Input, } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { emailPatternValidator } from 'src/app/shared/validators/email.validator';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss']
})
export class EmailInputComponent implements OnInit {

  @Input() parentForm: FormGroup;
  // Example ['nameField', 'disabled']
  @Input() value: string[];

  emailForm: FormGroup;
  valueForm: string;

  constructor() { }

  ngOnInit() {
    (this.value) ? this.valueForm = this.value[0] : this.valueForm = '';
    this.emailForm = new FormGroup({
      email: new FormControl(this.valueForm || '', [
        Validators.required,
        emailPatternValidator,
      ]),
    });

    if (this.value && this.value.indexOf('disabled') !== -1) {
      this.emailForm.disable();
    }

    this.parentForm.addControl('email', this.emailForm);
  }
}
