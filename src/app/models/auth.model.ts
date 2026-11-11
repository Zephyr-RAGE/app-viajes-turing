export interface LoginRequest {
  correo: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  correo: string;
  password: string;
  password_confirmation: string;
  idioma: string;
}

export interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface TokenResponse {
  success: boolean;
  data: TokenData;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface LogoutRequest {
  refresh_token: string;
}

export interface UsuarioResponse {
  id: number;
  nombre: string;
  correo: string;
  idioma: string;
  created_at: string;
  updated_at: string;
}
