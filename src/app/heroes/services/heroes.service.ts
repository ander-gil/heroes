import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl:string = environment.baseUrl

  constructor(private http:HttpClient) { }

    getHeroes(){
      const url = `${this.baseUrl}/heroes`;
      return this.http.get<Heroe[]>(url);
    }

    getheroe(id:string) {
      const url = `${this.baseUrl}/heroes/${id}`
      return this.http.get<Heroe>(url);
    }

    getSugerencias(termino:string): Observable<Heroe[]> {
      const url = `${this.baseUrl}/heroes?q=${termino}&_limit=6`;
      return this.http.get<Heroe[]>(url);
    }

    agregarHeroe(heroe:Heroe):Observable<Heroe> {
      return this.http.post<Heroe>(`${this.baseUrl}/heroes`,heroe);
    }

    actualizarHeroe(heroe:Heroe):Observable<Heroe> {
      return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`,heroe);
    }

    borrarHeroe(id:string):Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`);
    }
}

