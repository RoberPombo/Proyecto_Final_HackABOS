import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
// Locals ====================================================================
import { IPlayerProfile, IPlayerProfileHttpResponse, IVideosModel, IPlayerListHttpResponse } from '../core.models';
import { environment } from 'src/environments/environment';
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerProfile: IPlayerProfile;
  playerList: IPlayerProfile[];


  constructor(private http: HttpClient) { }


  addVideo(video: IVideosModel) {
    return this.http.post<IPlayerProfileHttpResponse>(
      `${environment.api.uri}/players/${this.playerProfile._id}/addVideo`
      , video);
  }


  createPlayer(playerProfile: IPlayerProfile) {
    return this.http.post<IPlayerProfileHttpResponse>(`${environment.api.uri}/players/`, playerProfile);
  }


  getPlayerList() {
    return this.http
      .get<IPlayerListHttpResponse>(`${environment.api.uri}/players`)
      .pipe(tap(player => this.playerList = player.data));
  }

  getPlayerProfile(id: string) {
    return this.http
      .get<IPlayerProfileHttpResponse>(`${environment.api.uri}/players/${id}`)
      .pipe(tap(res => this.playerProfile = res.data));
  }


  updateProfile(id: Identifiers, playerProfile: IPlayerProfile) {
    return this.http.put<IPlayerProfileHttpResponse>(`${environment.api.uri}/players/${id}`, playerProfile);
  }
}
