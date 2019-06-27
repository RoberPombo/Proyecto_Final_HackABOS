import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { IUserProfile } from 'src/app/core/core.models';
import { PlayerService } from 'src/app/core/services/player.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() public userForm: FormGroup;

  userData: IUserProfile;
  showComponent: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private playerServ: PlayerService,
    private router: Router,
    private snackServ: SnackbarService,
    private translate: TranslateService,
    public userServ: UserService,
    private authServ: AuthService,
  ) {
    this.calcView();
  }

  ngOnInit() {
    this.userServ.getUserProfile().subscribe(
      res => {
        this.userData = res.data;
        if (res.data.role === 'agent') {
          this.playerServ.getPlayerProfile(res.data.agentOf.playerId).subscribe();
        }
      },
    );
    this.userForm = this.fb.group({});
  }

  calcView() {
    this.breakpointObserver.observe(['(min-width: 800px)', '(min-width: 1200px)'])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints['(min-width: 800px)'] === true && state.breakpoints['(min-width: 1200px)'] === false) {
          this.showComponent = 'config-profile'
        } else if (state.breakpoints['(min-width: 1200px)'] === true) {
          this.showComponent = 'all'
        } else {
          this.showComponent = 'config'
        }
      })
  }


  becomeAgent() {
    this.router.navigate(['/players/new']);
  }


  becomeTeam() {
    this.userServ.updateProfile({
      email: this.userData.email,
      role: 'team',
    }).subscribe();
    this.userData = undefined;
    this.authServ.refreshToken().subscribe(() => {
      this.userServ.getUserProfile().subscribe(
        res => {
          this.userData = res.data;
          this.snackServ.show(res.message, 'success');
        },
      );
    });
  }


  changeShowComponent(nameComp: string) {
    this.showComponent = nameComp;
  }


  onSubmit(form) {
    if (form.valid) {
      const formValues: any = (Object.keys(form.value).reduce((c, k) => {
        c[k] = form.value[k][k];
        return c;
      }, {}));

      this.translate.use(formValues.language);
      this.userServ.updateProfile({
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
        (res) => this.snackServ.show(res.title, 'success'),
      );
    }
  }
}
