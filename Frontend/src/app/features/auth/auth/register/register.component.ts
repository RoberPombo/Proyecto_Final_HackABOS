// Angular ===================================================================
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective, FormGroup } from '@angular/forms';
// Locals ====================================================================
import { AuthComponent } from '../auth.component';
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
export class RegisterComponent implements OnInit {

  @Input() public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authComp: AuthComponent,
    private dialogServ: DialogService,
    private userServ: UserService,
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
    });
  }

  onSubmit(form, formDirective: FormGroupDirective) {
    if (form.valid) {
      const formValues: any = (Object.keys(form.value).reduce((c, k) => {
        c[k] = form.value[k][k];
        return c;
      }, {}));

      this.userServ.register(formValues)
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
