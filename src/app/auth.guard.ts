import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isRegistered = localStorage.getItem('isRegistered');  // Verifica si el usuario está registrado
    console.log('isRegistered:', isRegistered);
    if (isRegistered!=='true') {
      // Si no está registrado, redirige al registro
      this.router.navigate(['/registrar']);
      return false;
    }

    return true;  // Si está registrado, permite la navegación
  }
}
