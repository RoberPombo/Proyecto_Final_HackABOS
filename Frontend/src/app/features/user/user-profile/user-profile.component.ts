import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { IUserProfile } from 'src/app/core/core.models';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { Router } from '@angular/router';

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
    private playerServ: PlayerService,
    private router: Router,
    public userServ: UserService,
  ) { }

  ngOnInit() {
    this.userServ.getUserProfile().subscribe(
      res => {
        this.userData = res.data;
        if (res.data.role === 'scout') {
          this.playerServ.getPlayerProfile(res.data.agentOf.playerId).subscribe();
        }
      },
    );

    this.userForm = this.fb.group({});
  }


  addVideosPlayer() {
    this.router.navigate(['/players/youtube']);
  }


  becomeAgent() {
    this.router.navigate(['/players/new']);
  }


  becomeTeam() {
    this.userServ.updateProfile({
      email: this.userData.email,
      role: 'team'
    }).subscribe();
    this.userData = undefined;
    this.userServ.getUserProfile().subscribe(
      res => {
        this.userData = res.data;
        this.snackServ.openSnackbar('Ya puede buscar promesas', 'green-snackbar', 2);
      },
    );
  }


  goPlayerProfile() {
    console.log(this.userData.agentOf);
    console.log(this.playerServ.playerProfile);
    this.router.navigate([`/players/${this.userData.agentOf.playerId}`]);
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
