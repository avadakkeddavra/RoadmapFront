import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../../core/services/auth.service';
import {toast} from 'angular2-materialize';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(
    private router: Router,
    private AuthService: AuthService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let token = localStorage.getItem('token');

    if(!token) {
      this.router.navigate(['/login']);
      return false;
    }

    let user = this.AuthService.userData();

    if(user.role == 0) {
      return true;
    } else {
      toast('Only for users',2000);
      this.router.navigate(['']);
      return false;
    }
  }
}
