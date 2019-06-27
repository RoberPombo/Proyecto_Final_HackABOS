// Angular ===================================================================
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from './core/services/loader.service';
import { UserService } from './core/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Sport Scout';

  languageOptions = ['en', 'es'];

  constructor(
    public loaderServ: LoaderService,
    private userServ: UserService,
    private swUpdate: SwUpdate,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('en');
    if (this.userServ.userProfile && this.userServ.userProfile.language) {
      this.translate.use(this.userServ.userProfile.language);
    } else {
      const langNav = navigator.language.slice(0, 2).toLowerCase();
      if (this.languageOptions.indexOf(langNav) !== -1) {
        this.translate.use(langNav);
      }
    }
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
  }
}
