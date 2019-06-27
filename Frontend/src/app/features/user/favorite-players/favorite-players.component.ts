import { Component, OnInit, Input } from '@angular/core';
import { IUserProfile } from 'src/app/core/core.models';

@Component({
  selector: 'app-favorite-players',
  templateUrl: './favorite-players.component.html',
  styleUrls: ['./favorite-players.component.scss']
})
export class FavoritePlayersComponent implements OnInit {


  @Input() userData: IUserProfile;

  constructor() { }

  ngOnInit() {
  }

}
