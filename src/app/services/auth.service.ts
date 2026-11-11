import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environment/environment';

import {
  LoginRequest,
  RegisterRequest,
  TokenResponse,
  RefreshRequest,
  LogoutRequest,
  UsuarioResponse,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/auth`;

  // Registro
  register(data: RegisterRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.apiUrl}/register`, data);
  }

  // Login
  login(data: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, data);
  }

  // Obtener usuario autenticado
  me(): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/me`);
  }

  // Renovar tokens
  refresh(data: RefreshRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/refresh`, data);
  }

  // Cerrar sesión
  logout(data: LogoutRequest): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/logout`, data);
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    sessionStorage.setItem('access_token', accessToken);
    sessionStorage.setItem('refresh_token', refreshToken);
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem('refresh_token');
  }

  clearTokens(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  }
}
