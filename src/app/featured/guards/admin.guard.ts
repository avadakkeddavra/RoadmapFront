import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {toast} from 'angular2-materialize';


@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let token = localStorage.getItem('token');
    let jwt = require('jsonwebtoken');

    if(token) {

      let user = jwt.decode(token);

      if(user.role == 1) {
        return true;
      } else {
        this.router.navigate(['']);
        toast('Only for admins', 2000);
        return false;
      }

    } else {

      this.router.navigate(['login']);
      return false;

    }


  }
}
