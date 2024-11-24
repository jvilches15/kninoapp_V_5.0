import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isRegistered = localStorage.getItem('isRegistered');  
    console.log('isRegistered:', isRegistered);
    if (isRegistered!=='true') {
      
      this.router.navigate(['/registrar']);
      return false;
    }

    return true;  
  }
}
