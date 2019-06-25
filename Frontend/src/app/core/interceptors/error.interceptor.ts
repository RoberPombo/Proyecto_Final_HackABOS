// Angular ===================================================================
import { catchError } from 'rxjs/operators';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
// Locals ====================================================================
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackServ: SnackbarService,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (
          error.status === 401 && error.error.message === 'Unauthorized user.' &&
          this.authService.authTokens && this.authService.authTokens.refreshToken
        ) {
          this.authService.rejectRefreshToken = true;
          this.authService.refreshToken().subscribe();
        } else if (
          error.url.indexOf('/auth') === -1 &&
          error.status === 401 && error.error.message === 'Unauthorized refresh token.'
        ) {
          this.snackServ.openSnackbar(error.error.message, 'red-snackbar', 3);
          this.authService.logout();
        } else {
          this.snackServ.openSnackbar(error.error.message, 'red-snackbar', 3);
          // this.router.navigate(['/user']);
        }
        return throwError(error);
      })
    );
  }
}
