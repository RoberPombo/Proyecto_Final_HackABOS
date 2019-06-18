// Angular ===================================================================
import { Component, OnInit } from '@angular/core';
// Translate =================================================================
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
// Material Angular  =========================================================



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public activeLang = 'es';
  public loginClass: string;
  public registerClass: string;
  public liClass: string;

  constructor(
    private authServ: AuthService
  ) {
  }

  ngOnInit() {
    this.changeContainer(true);
  }

  changeContainer(status) {
    if (status === true) {
      this.loginClass = 'active';
      this.registerClass = '';
      this.liClass = 'moveOutRegister';
    }
    if (status === false) {
      this.loginClass = '';
      this.registerClass = 'active';
      this.liClass = 'moveOutLogin';
    }
  }
}
