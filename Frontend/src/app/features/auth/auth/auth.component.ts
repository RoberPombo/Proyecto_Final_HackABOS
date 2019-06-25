// Angular ===================================================================
import { Component, OnInit } from '@angular/core';
// Translate =================================================================
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
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
