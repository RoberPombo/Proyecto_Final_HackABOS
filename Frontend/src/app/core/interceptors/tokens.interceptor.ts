import { Injectable } from '@angular/core';
// Angular ===================================================================
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
// Locals ====================================================================
import { AuthService } from '../services/auth.service';


@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService && this.authService.authTokens) {
      if (this.authService.rejectRefreshToken === true) {
        const { jwtToken } = this.authService.authTokens;

        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${jwtToken}`,
          }
        });
      } else {
        const { refreshToken } = this.authService.authTokens;

        request = request.clone({
          setHeaders: {
            'X-RefreshToken': refreshToken,
          }
        });
      }
    }

    return next.handle(request);
  }
}
