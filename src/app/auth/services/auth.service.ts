import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { auth } from '../interfaces/auth.interface';
import { map, tap,  } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'   // gracias a esto tengo acceso a este ervicio desde cualquier parte de mi aplicacion
})
export class AuthService {

  private baseUrl:string = environment.baseUrl
  private _auth:auth | undefined

  get Auth(){
    return {...this._auth}  // asi desustrcturamos para que no se vaya a cambiar por error, en este caso lo voy a inyectar en el homeComponent
  }

  constructor(private http:HttpClient) { }
 // el of sirve para poner argumentos como observable
  verificaAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('id')) {
      return of(false);
    }
    //map sirve para transformar del operador anterior o del observable y tranformarlo
    return this.http.get<auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      map(auth=>{
        // console.log('map', auth);   //retorna true si existe y false si no
        this._auth=auth;
        return true;
      })
      );
  }

  login(){
    return this.http.get<auth>(`${this.baseUrl}/usuarios/1`).
    pipe(
      tap(resp=>{this._auth=resp}),
      tap(resp=>{localStorage.setItem('id', resp.id)})
    )
  }

  logout(){
    this._auth=undefined;
  }
}
