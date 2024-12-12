import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, Router],
    });

    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('debería devolver falso y navegar hacia registrar si no esta registrado', () => {
    spyOn(localStorage, 'getItem').and.returnValue('false');  
    spyOn(router, 'navigate');  

    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;

    const result = authGuard.canActivate(route, state);  
    expect(result).toBe(false);  
    expect(router.navigate).toHaveBeenCalledWith(['/registrar']);  
  });

  it('debería devolver verdadero si esta registrado', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');  

    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {} as any;

    const result = authGuard.canActivate(route, state);  
    expect(result).toBe(true);  
  });
});

