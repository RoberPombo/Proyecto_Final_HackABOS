import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private authServ: AuthService,
    private router: Router,
    public userServ: UserService,
  ) { }


  logout() {
    this.authServ.logout();
  }


  goPlayerProfile() {
    this.router.navigate([`/players/${this.userServ.userProfile.agentOf.playerId}`])
  }


  goUserProfile() {
    this.router.navigate(['/user']);
  }


  searchPlayers() {
    this.router.navigate(['/players']);
  }
}
