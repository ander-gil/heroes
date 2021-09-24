import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate{

  constructor(private authservice: AuthService,
              private      router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> |  Promise<boolean>  | boolean {
      // if (this.authservice.Auth.id){
      //   return true;
      // }
      //   console.log('bloqueado por el canActivate');
      //   return false;
      return this.authservice.verificaAutenticacion()
      .pipe(
        tap(estaAutenticado=>{
          if(!estaAutenticado){
            this.router.navigate(['./auth/login'])
          }
        })
      )


  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean>| Promise<boolean> | boolean {
      // aqui no me generea un error porque admite observables o boolean
      return this.authservice.verificaAutenticacion()
      .pipe(
        tap(estaAutenticado=>{
          if(!estaAutenticado){
            this.router.navigate(['./auth/login'])
          }
        })
      )
    // if (this.authservice.Auth.id){
    //   return true;
    // }
    //   console.log('bloqueado por el audgards canLoad');
    //   return false;

  }
}
