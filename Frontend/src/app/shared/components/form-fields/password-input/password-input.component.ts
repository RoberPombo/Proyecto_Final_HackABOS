import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { passwordPatternValidator } from 'src/app/shared/validators/password.validator';


@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {

  @Input() parentForm: FormGroup;

  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        passwordPatternValidator,
      ]),
    });
    this.parentForm.addControl('password', this.passwordForm);
  }
}
