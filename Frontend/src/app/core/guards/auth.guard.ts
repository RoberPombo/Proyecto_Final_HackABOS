// Angular ===================================================================
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';
// Locals ====================================================================
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authServ: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, snapshot: RouterStateSnapshot) {
    if (this.authServ && this.authServ.authTokens) {
      const { jwtToken } = this.authServ.authTokens;

      if (jwtToken) {
        return true;
      }
    }

    this.router.navigate(['/auth']);

    return false;
  }
}
