// Angular ===================================================================
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
// Locals ====================================================================
import { AuthComponent } from '../auth.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { emailPatternValidator } from 'src/app/shared/validators/email.validator';
import { matchPasswordValidator } from 'src/app/shared/validators/match-password.validator';
import { passwordPatternValidator } from 'src/app/shared/validators/password.validator';
import { DialogService } from 'src/app/core/services/dialog.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    email: ['', [Validators.required, emailPatternValidator,]],
    password: ['', [Validators.required, passwordPatternValidator,]],
    confirmPassword: ['', [Validators.required, passwordPatternValidator,]],
  },
    { validators: matchPasswordValidator }
  );


  constructor(
    private fb: FormBuilder,
    private authComp: AuthComponent,
    private dialogServ: DialogService,
    private userServ: UserService,
  ) { }


  register(formDirective: FormGroupDirective) {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      this.userServ.register({ email, password })
        .subscribe(() => {
          this.dialogServ.openDialog('infoActivationEmail')
            .subscribe(
              () => {
                formDirective.resetForm();
                this.registerForm.reset();
                this.authComp.changeContainer(true);
              },
            );
        }
        );
    }
  }
}
