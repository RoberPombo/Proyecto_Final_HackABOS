import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { IYoutubeVideosModel, IYoutubeHttpResponse } from '../core.models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  videos: IYoutubeVideosModel[];
  prevPage: string;
  nextPage: string;
  totalResults: number;

  constructor(private http: HttpClient, private userServ: UserService) { }

  searchVideos(filter) {
    return this.http.get<IYoutubeHttpResponse>(
      `${environment.api.uri}/players/${this.userServ.userProfile.agentOf.playerId}/youtube?filter=${filter}`
    ).pipe(tap(
      res => {
        this.nextPage = res.data.nextPageToken;
        this.prevPage = res.data.prevPageToken || '';
        this.totalResults = res.data.totalResults;
        this.videos = res.data.items;
      }
    ));
  }

}
