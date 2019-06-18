// Angular ===================================================================
import { Component, Inject } from '@angular/core';
// Material Angular  =========================================================
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
// Locals ====================================================================
import { DialogModal } from './dialog.models';
import { FormBuilder, Validators } from '@angular/forms';
import { emailPatternValidator } from 'src/app/shared/validators/email.validator';
import { passwordPatternValidator } from 'src/app/shared/validators/password.validator';
import { matchPasswordValidator } from 'src/app/shared/validators/match-password.validator';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  form;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogModal,
  ) {
    if (this.data.type === 'resendActivationEmail') {
      this.form = this.fb.group({
        email: ['', [Validators.required, emailPatternValidator]],
      });
    } else if (this.data.type === 'forgotPassword') {
      this.form = this.fb.group({
        email: ['', [Validators.required, emailPatternValidator,]],
        password: ['', [Validators.required, passwordPatternValidator,]],
        confirmPassword: ['', [Validators.required, passwordPatternValidator,]],
      },
        { validators: matchPasswordValidator }
      );
    }
  }


  confirm() {
    if (this.data.type === 'infoActivationEmail' || this.data.type === 'infoForgotPassword') {
      return this.dialogRef.close();
    }
    if (this.form.valid) {
      const { email } = this.form.value;
      return this.dialogRef.close(this.form.value);
    }
  }

}
