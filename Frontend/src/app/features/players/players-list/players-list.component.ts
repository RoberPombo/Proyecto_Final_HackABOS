import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from 'src/app/core/services/player.service';
import { IPlayerProfile } from 'src/app/core/core.models';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {

  @Input() public playerForm: FormGroup;

  playerList: IPlayerProfile[];
  preferredPositions: string[];
  dateNow: number;

  constructor(
    public playerServ: PlayerService,
    private userServ: UserService,
    private snackServ: SnackbarService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.playerServ.getPlayerList().subscribe(
      res => this.playerList = res.data
    )
    this.playerForm = this.fb.group({});
    this.dateNow = Date.now();
  }

  addFavoritePlayer(player) {
    this.userServ.addFavoritePlayer(player).subscribe(
      res => this.snackServ.show(res.title, 'success')
    );
  }

  checkPosition(player) {
    if (this.playerForm.value.filterPositions.filterPositions !== '') {
      if (player.preferredPositions.indexOf(this.playerForm.value.filterPositions.filterPositions) === -1) {
        return false;
      }
      return true;
    }
    return true;
  }

}
