// Angular ===================================================================
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from './core/services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Sport Scout';

  activeLang = 'es';

  constructor(
    private swUpdate: SwUpdate,
    private translate: TranslateService,
    public loaderServ: LoaderService,
  ) {
    this.translate.setDefaultLang(this.activeLang);
    this.translate.use(this.activeLang);
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
  }
}
