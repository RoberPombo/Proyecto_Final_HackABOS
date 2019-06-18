// Angular ===================================================================
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Locals ====================================================================
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { emailPatternValidator } from 'src/app/shared/validators/email.validator';
import { passwordPatternValidator } from 'src/app/shared/validators/password.validator';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { SnackbarComponent } from 'src/app/layout/snackbar/snackbar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      emailPatternValidator,
    ]],
    password: ['', [
      Validators.required,
      passwordPatternValidator,
    ]],
  });


  constructor(
    private authServ: AuthService,
    private dialogServ: DialogService,
    private fb: FormBuilder,
    private router: Router,
    private userServ: UserService,
    private snackbarServ: SnackbarService,
  ) { }


  login() {
    if (this.loginForm.valid) {
      this.authServ.login(this.loginForm.value).subscribe(
        () => {
          this.userServ.getUserProfile().subscribe(
            () => this.router.navigate(['/']),
          );
        },
        () => this.loginForm.get('password').setValue(''),
      );
    }
  }


  resendEmailActivation() {
    this.dialogServ.openDialog('resendActivationEmail').subscribe(
      result => {
        if (result && result.email) {
          this.userServ.resendActivationEmail({ email: result.email }).subscribe(
            () => this.dialogServ.openDialog('infoActivationEmail').subscribe(),
          );
        }
      },
    );
  }


  resetPassword() {
    this.dialogServ.openDialog('forgotPassword').subscribe(
      result => {
        if (result && result.email && result.password) {
          this.userServ.changePassword({
            email: result.email,
            password: result.password,
          }).subscribe(
            () => this.dialogServ.openDialog('infoForgotPassword').subscribe(),
          );
        }
      }
    );
  }
}
