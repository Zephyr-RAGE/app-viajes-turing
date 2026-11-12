import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';
import { ClimaResponse } from '../models/clima.model';

@Injectable({
  providedIn: 'root',
})
export class ClimaService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/clima`;

  obtenerClima(ciudadId: number): Observable<ClimaResponse> {
    return this.http.get<ClimaResponse>(`${this.apiUrl}/${ciudadId}`);
  }
}
