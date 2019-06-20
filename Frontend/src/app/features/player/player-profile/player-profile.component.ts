import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IPlayerProfile } from 'src/app/core/core.models';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { PlayerService } from 'src/app/core/services/player.service';
import { ActivatedRoute } from '@angular/router';
// Material
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';



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

  constructor(
    private fb: FormBuilder,
    public playerServ: PlayerService,
    private route: ActivatedRoute,
    private snackServ: SnackbarService,
  ) {
    this.playerId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.playerForm = this.fb.group({
      birthdate: [''],
    });

    this.playerServ.getPlayerProfile(this.playerId).subscribe(
      response => {
        this.playerData = response.data[0];
        this.playerForm.controls.birthdate.setValue(new Date(response.data[0].birthdate));
      },
    );
  }

  onSubmit(form) {
    console.log(form.value)
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

      this.playerServ.updateProfile(this.playerId, formValues).subscribe(
        (res) => this.snackServ.openSnackbar(res.message, 'green-snackbar', 3),
      );
    }
  }
}
