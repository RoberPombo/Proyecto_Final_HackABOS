import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { IUserProfile } from 'src/app/core/core.models';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() public userForm: FormGroup;

  userData: IUserProfile;

  constructor(
    private fb: FormBuilder,
    private snackServ: SnackbarService,
    public userServ: UserService,
  ) { }

  ngOnInit() {
    this.userServ.getUserProfile().subscribe(
      response => {
        this.userData = response.data;
        // TODO: Si role==scout, pedir el perfil del jugador.
      },
    );

    this.userForm = this.fb.group({});
  }

  onSubmit(form) {
    if (form.valid) {
      const formValues: any = (Object.keys(form.value).reduce((c, k) => {
        c[k] = form.value[k][k];
        return c;
      }, {}));

      this.userServ.updateProfile({
        _id: this.userData._id,
        email: this.userData.email,
        role: this.userData.role,
        language: formValues.language,
        profile: {
          fullName: formValues.fullName,
          document: formValues.document,
          address1: formValues.address1,
          address2: formValues.address2,
          city: formValues.city,
          country: formValues.country,
        },
        contact: {
          phone: formValues.phone,
          mobile: formValues.mobile,
          email: formValues.email,
          other: formValues.other,
        }
      }).subscribe(
        (res) => this.snackServ.openSnackbar(res.message, 'green-snackbar', 3),
      );
    }
  }
}
