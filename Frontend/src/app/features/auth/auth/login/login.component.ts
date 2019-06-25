// Angular ===================================================================
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// Locals ====================================================================
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { DialogService } from 'src/app/core/services/dialog.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() public loginForm: FormGroup;

  constructor(
    private authServ: AuthService,
    private dialogServ: DialogService,
    private fb: FormBuilder,
    private router: Router,
    private userServ: UserService,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
    });
  }


  onSubmit(form) {
    if (form.valid) {
      const formValues: any = (Object.keys(form.value).reduce((c, k) => {
        c[k] = form.value[k][k];
        return c;
      }, {}));
      const email = formValues.email.toLowerCase().trim();

      this.authServ.login({ password: formValues.password, email }).subscribe(
        () => {
          this.userServ.getUserProfile().subscribe(
            () => this.router.navigate(['/user']),
          );
        },
        () => this.loginForm.get('password.password').setValue(''),
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
