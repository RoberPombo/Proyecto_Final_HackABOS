import { NgModule, APP_INITIALIZER } from '@angular/core';
import { UserService } from './core/services/user.service';
import { PlayerService } from './core/services/player.service';
import { Router } from '@angular/router';

export function getInitialData(userServ: UserService, playerServ: PlayerService, router: Router) {
  return () => {
    if (localStorage.getItem('auth')) {
      return new Promise(async resolve => {
        try {
          await userServ.getUserProfile().toPromise();
          if (userServ.userProfile.role === 'scout') {
            await playerServ.getPlayerProfile(userServ.userProfile.agentOf.playerId).toPromise();
          }
          if (userServ.userProfile.role === 'team') {
            router.navigate(['/players']);
          } else {
            router.navigate(['/user']);
          }
          return resolve();
        } catch (error) {

          return resolve(error);
        }
      });
    }
    userServ.userProfile = undefined;
    playerServ.playerProfile = undefined;

    return Promise.resolve();
  };
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: getInitialData,
      deps: [UserService, PlayerService],
      multi: true
    }
  ]
})
export class AppInitializerModule { }
