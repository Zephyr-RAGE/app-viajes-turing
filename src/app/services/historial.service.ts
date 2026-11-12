import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { HistorialCreate, HistorialResponse } from '../models/historial.model';

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/historial`;

  crear(data: HistorialCreate): Observable<HistorialResponse> {
    return this.http.post<HistorialResponse>(`${this.apiUrl}/`, data);
  }

  obtenerTodos(): Observable<HistorialResponse[]> {
    return this.http.get<HistorialResponse[]>(`${this.apiUrl}/`);
  }

  obtenerPorId(id: number): Observable<HistorialResponse> {
    return this.http.get<HistorialResponse>(`${this.apiUrl}/${id}`);
  }

  actualizar(id: number, data: HistorialCreate): Observable<HistorialResponse> {
    return this.http.put<HistorialResponse>(`${this.apiUrl}/${id}`, data);
  }

  eliminar(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
  }
}
