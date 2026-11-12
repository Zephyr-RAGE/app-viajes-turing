import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';

import { Pais, Ciudad, Moneda } from '../models/catalogo.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogoService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/catalogos`;

  getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.apiUrl}/paises/`);
  }

  getCiudades(paisId?: number): Observable<Ciudad[]> {
    const url = paisId ? `${this.apiUrl}/ciudades/?pais_id=${paisId}` : `${this.apiUrl}/ciudades/`;

    return this.http.get<Ciudad[]>(url);
  }

  getMonedas(): Observable<Moneda[]> {
    return this.http.get<Moneda[]>(`${this.apiUrl}/monedas/`);
  }
}
