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

  nextPage: string;
  prevPage: string;
  totalPages: number;
  page: number;
  filterValue: string;


  constructor(
    private sanitizer: DomSanitizer,
    public playerServ: PlayerService,
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
      channelTitle: video.channelTitle,
    }).subscribe(
      res => this.snackServ.show(res.title, 'success'),
    );
  }


  getSantizeUrl(id: string) {
    const url = `https://www.youtube.com/embed/${id}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  searchYoutube(pageChange) {
    if (this.searchForm.valid) {
      this.filterValue = this.searchForm.value.search;
      if (!this.page) this.page = 1;
      this.youtubeServ.searchVideos(this.searchForm.controls.search.value, pageChange).subscribe(
        res => {
          this.videos = res.data.items;
          this.nextPage = res.data.nextPageToken || '';
          this.prevPage = res.data.prevPageToken || '';
          this.totalPages = Math.ceil(res.data.totalResults / 5);
        },
      );
    }
  }

  goNextPage() {
    this.page = this.page + 1;
    this.searchYoutube(this.nextPage);
  }

  goPrevPage() {
    this.page = this.page - 1;
    this.searchYoutube(this.prevPage);
  }
}
