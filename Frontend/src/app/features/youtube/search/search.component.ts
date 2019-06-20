import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { YoutubeService } from 'src/app/core/services/youtube.service';
import { IYoutubeVideosModel } from 'src/app/core/core.models';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public videos: any[];

  constructor(
    private sanitizer: DomSanitizer,
    private youtubeServ: YoutubeService,
  ) { }

  ngOnInit() {
    this.youtubeServ.searchVideos('messi').subscribe(
      res => this.videos = res.items,
    );
  }


  addVideo(video: IYoutubeVideosModel) {
    console.log(video);
  }


  getSantizeUrl(id: string) {
    const url = `//www.youtube.com/embed/${id}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  buscarYoutube() {

  }
}
