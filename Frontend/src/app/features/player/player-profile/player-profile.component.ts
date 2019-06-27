import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IPlayerProfile } from 'src/app/core/core.models';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
// Material
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { UserService } from 'src/app/core/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';



export const MY_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY', },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  }
};


@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class PlayerProfileComponent implements OnInit {

  @Input() public playerForm: FormGroup;

  playerData: IPlayerProfile;
  playerId: string;
  showComponent: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    public playerServ: PlayerService,
    public userServ: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private snackServ: SnackbarService,
  ) {
    this.playerId = this.route.snapshot.paramMap.get('id');
    this.breakpointObserver.observe(['(min-width: 800px)', '(min-width: 1200px)'])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints['(min-width: 800px)'] === true) {
          this.changeShowComponent('profile-videos')
        } else {
          this.changeShowComponent('profile')
        }
      })
  }

  ngOnInit() {
    this.playerForm = this.fb.group({
      birthdate: [''],
    });
    if (this.playerId === 'new') {
      this.playerData = {
        fullName: '',
        birthdate: null,
        nationality: '',
        height: null,
        weight: null,
        sport: this.userServ.userProfile.sport,
        team: '',
        preferredFoot: '',
        preferredPositions: [],
      };
    } else {
      this.playerServ.getPlayerProfile(this.playerId).subscribe(
        response => {
          this.playerData = response.data;
          this.playerForm.controls.birthdate.setValue(new Date(response.data.birthdate));
        },
      );
    }
  }

  changeShowComponent(nameComp: string) {
    this.showComponent = nameComp;
  }


  getSantizeUrl(id: string) {
    const url = `https://www.youtube.com/embed/${id}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  onSubmit(form) {
    if (form.valid) {
      const formValues: any = (Object.keys(form.value).reduce((c, k) => {
        if (k === 'birthdate') {
          const birthdate = (form.value.birthdate._d) ? form.value.birthdate._d : form.value.birthdate;
          c[k] = new Date(birthdate).getTime();
        } else {
          c[k] = form.value[k][k];
        }
        return c;
      }, {}));

      if (this.playerId === 'new') {
        return this.playerServ.createPlayer(formValues).subscribe(
          (res) => {
            this.userServ.getUserProfile().subscribe(
              () => {
                this.snackServ.show(res.title, 'success');
                this.router.navigate(['/user']);
              }
            )
          }
        )
      }

      return this.playerServ.updateProfile(this.playerId, formValues).subscribe(
        (res) => this.snackServ.show(res.title, 'success'),
      );
    }
  }
}
