import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private tokenKey: string;
  constructor(private router: Router) {
    this.tokenKey = environment.tokenKey;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem(this.tokenKey);
      if(token) {
        const decodedToken = jwt_decode<any>(token);
        if(decodedToken.exp) {
          const dateExp = new Date(decodedToken.exp * 1000);
            if(new Date() >= dateExp) {
              this.router.navigate(['account/signin']);
              return false;
            }
        }

        return true;
      } else {
        this.router.navigate(['account/signin']);
        return false;
      }
  }
  
}
