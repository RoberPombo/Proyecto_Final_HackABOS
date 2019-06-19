// Angular ===================================================================
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
// Locals ====================================================================
import { environment } from 'src/environments/environment';
import { IAuthTokens, ILoginHttpResponse } from '../core.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authTokens: IAuthTokens;
  rejectRefreshToken = false;
  role: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.authTokens = JSON.parse(localStorage.getItem('auth'));
  }


  login({ email, password }) {
    const loginUri = `${environment.api.uri}/login`;

    return this.http.post<ILoginHttpResponse>(loginUri, {
      email,
      password,
    }).pipe(tap(response => {
      this.rejectRefreshToken = false;
      this.authTokens = response.data[0];
      localStorage.setItem('auth', JSON.stringify(this.authTokens));
    }));
  }


  logout() {
    localStorage.removeItem('auth');
    this.authTokens = null;
    this.rejectRefreshToken = false;
    this.router.navigate(['/auth']);
  }


  refreshToken() {
    this.rejectRefreshToken = true;
    return this.http.get<ILoginHttpResponse>(`${environment.api.uri}/refreshToken`)
      .pipe(tap(response => {
        this.rejectRefreshToken = false;
        this.authTokens = response.data[0];
        localStorage.setItem('auth', JSON.stringify(this.authTokens));
      }));
  }
}