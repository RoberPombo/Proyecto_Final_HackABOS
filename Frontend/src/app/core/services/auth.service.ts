// Angular ===================================================================
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
// Locals ====================================================================
import { environment } from 'src/environments/environment';
import { IAuthTokens, ILoginHttpResponse } from '../core.models';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authTokens: IAuthTokens;
  rejectRefreshToken = true;
  role: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private playerServ: PlayerService,
    private userServ: UserService,
  ) {
    const authTokensLocalStorage = JSON.parse(localStorage.getItem('auth'));
    if (authTokensLocalStorage && authTokensLocalStorage.jwtToken) {
      this.authTokens = authTokensLocalStorage;
    }
  }


  login({ email, password }) {
    const loginUri = `${environment.api.uri}/login`;

    return this.http.post<ILoginHttpResponse>(loginUri, {
      email,
      password,
      sport: 'soccer',
    }).pipe(tap(response => {
      this.authTokens = response.data;
      localStorage.setItem('auth', JSON.stringify(this.authTokens));
    }));
  }


  logout() {
    localStorage.removeItem('auth');
    this.authTokens = null;
    this.playerServ.playerProfile = undefined;
    this.userServ.userProfile = undefined;
    this.router.navigate(['/auth']);
  }


  refreshToken() {
    return this.http.get<ILoginHttpResponse>(`${environment.api.uri}/refreshToken`)
      .pipe(tap(response => {
        this.authTokens = response.data;
        this.rejectRefreshToken = true;
        if (this.authTokens && this.authTokens.jwtToken) {
          localStorage.setItem('auth', JSON.stringify(this.authTokens));
        }
        this.router.navigate(['']);
      }));
  }
}
