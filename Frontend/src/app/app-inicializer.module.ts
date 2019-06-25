import { NgModule, APP_INITIALIZER } from '@angular/core';
import { UserService } from './core/services/user.service';
import { PlayerService } from './core/services/player.service';


export function getInitialData(userServ: UserService, playerServ: PlayerService) {
  return () => {
    const authTokens = JSON.parse(localStorage.getItem('auth'));
    if (authTokens && authTokens.jwtToken) {
      return new Promise(async resolve => {
        try {
          await userServ.getUserProfile().toPromise();
          if (userServ.userProfile.role === 'agent') {
            await playerServ.getPlayerProfile(userServ.userProfile.agentOf.playerId).toPromise();
          }
          return resolve();
        } catch (error) {

          return resolve(error);
        }
      });
    }

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
