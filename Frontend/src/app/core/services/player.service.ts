import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
// Locals ====================================================================
import { IPlayerProfile, IPlayerProfileHttpResponse } from '../core.models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerProfile: IPlayerProfile;

  constructor(private http: HttpClient) { }


  createPlayer(playerProfile) {
    return this.http.post<IPlayerProfileHttpResponse>(`${environment.api.uri}/players/`, playerProfile);
  }


  getPlayerProfile(id) {
    return this.http
      .get<IPlayerProfileHttpResponse>(`${environment.api.uri}/players/${id}`)
      .pipe(tap(player => this.playerProfile = player.data[0]));
  }


  updateProfile(id, playerProfile) {
    return this.http.put<IPlayerProfileHttpResponse>(`${environment.api.uri}/players/${id}`, playerProfile);
  }
}
