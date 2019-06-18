import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
// Locals ====================================================================
import { IUserProfile, IUserProfileHttpResponse } from '../core.models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userProfile: IUserProfile;

  constructor(private http: HttpClient) { }


  changePassword({ email, password }) {
    return this.http.post(`${environment.api.uri}/user/password`, {
      email,
      password,
    });
  }

  getUserProfile() {
    return this.http
      .get<IUserProfileHttpResponse>(`${environment.api.uri}/user`)
      .pipe(tap(user => this.userProfile = user.data));
  }


  register({ email, password }) {
    return this.http.post(`${environment.api.uri}/user`, {
      email,
      password,
    });
  }


  resendActivationEmail({ email }) {
    return this.http.post(`${environment.api.uri}/user/activation`, {
      email,
    });
  }
}
