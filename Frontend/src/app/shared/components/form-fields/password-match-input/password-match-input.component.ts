import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { passwordPatternValidator } from 'src/app/shared/validators/password.validator';
import { matchPasswordValidator } from 'src/app/shared/validators/match-password.validator';


@Component({
  selector: 'app-password-match-input',
  templateUrl: './password-match-input.component.html',
  styleUrls: ['./password-match-input.component.scss']
})
export class PasswordMatchInputComponent implements OnInit {

  @Input() parentForm: FormGroup;

  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        passwordPatternValidator,
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        passwordPatternValidator,
      ]),
    },
      { validators: matchPasswordValidator }
    );
    this.parentForm.addControl('password', this.passwordForm);
  }
}
