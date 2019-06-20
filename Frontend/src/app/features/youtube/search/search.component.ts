import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeService } from 'src/app/core/services/youtube.service';
import { IYoutubeVideosModel } from 'src/app/core/core.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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
    private youtubeServ: YoutubeService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ['', [Validators.minLength(3), Validators.required]],
    });
  }


  addVideo(video: IYoutubeVideosModel) {
    console.log(video);
  }


  getSantizeUrl(id: string) {
    const url = `//www.youtube.com/embed/${id}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  searchYoutube() {
    if (this.searchForm.valid) {
      this.youtubeServ.searchVideos(this.searchForm.controls.search.value).subscribe(
        res => this.videos = res.items,
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
