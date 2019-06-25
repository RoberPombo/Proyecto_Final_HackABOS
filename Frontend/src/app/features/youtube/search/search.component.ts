import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeService } from 'src/app/core/services/youtube.service';
import { IYoutubeVideosModel } from 'src/app/core/core.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/core/services/player.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public videos: any[];
  searchForm: FormGroup;


  constructor(
    private sanitizer: DomSanitizer,
    private playerServ: PlayerService,
    private snackServ: SnackbarService,
    private youtubeServ: YoutubeService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', [Validators.minLength(3), Validators.required]],
    });
  }


  addVideo(video: IYoutubeVideosModel) {
    this.playerServ.addVideo({
      videoId: video.id,
      likeCount: video.likeCount,
      viewCount: video.viewCount,
      publishedAt: video.publishedAt,
    }).subscribe(
      res => this.snackServ.openSnackbar(res.message, 'green-snackbar', 3),
    );
  }


  getSantizeUrl(id: string) {
    const url = `//www.youtube.com/embed/${id}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  searchYoutube() {
    if (this.searchForm.valid) {
      this.youtubeServ.searchVideos(this.searchForm.controls.search.value).subscribe(
        res => this.videos = res.data.items,
      );
    }
  }

  nextPage() {
    console.log('nextpage');
  }

  prevPage() {
    console.log('prevpage');
  }
}
