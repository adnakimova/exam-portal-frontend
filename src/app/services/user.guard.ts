import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router: Router,private login: LoginService){
      
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    
    : Observable<boolean |
     UrlTree> | Promise<boolean | 
     UrlTree> | boolean | UrlTree {

      if(this.login.isLoggedIn()){
        console.log("logged in")
        
        return true;
      }
      this.router.navigate(['login']);
      return false;
  }
  
}
