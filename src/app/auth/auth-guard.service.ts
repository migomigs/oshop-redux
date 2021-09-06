import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService
    ) {
     }

  async canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Promise<boolean>{

    console.log('This is the original this.auth', this.auth.isAuthenticated());  
    if(!this.auth.isAuthenticated()){
      console.log('routerState',this.router.routerState);
      this.router.navigate(['/login'], 
        {queryParams: {returnUrl: state.url}});
      return false;
    }else{
      console.log('AuthGuard - returns true');
      return true;
    }
  }
}
