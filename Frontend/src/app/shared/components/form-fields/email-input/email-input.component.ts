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

  emailForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        emailPatternValidator,
      ]),
    });
    this.parentForm.addControl('email', this.emailForm);
  }
}
