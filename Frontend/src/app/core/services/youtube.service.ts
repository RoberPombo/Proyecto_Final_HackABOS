import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { IYoutubeVideosModel, IYoutubeHttpResponse } from '../core.models';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  videos: IYoutubeVideosModel[];
  prevPage: string;
  nextPage: string;
  totalResults: number;

  constructor(private http: HttpClient) { }

  searchVideos(filter) {
    return this.http.post<IYoutubeHttpResponse>(`${environment.api.uri}/players/youtube`, {
      filter,
    }).pipe(tap(
      res => {
        this.nextPage = res.nextPageToken;
        this.prevPage = res.prevPageToken || '';
        this.totalResults = res.totalResults;
        this.videos = res.items;
      }
    ));
  }

}
