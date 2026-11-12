export interface Pais {
  id: number;
  nombre: string;
  codigo: string;
  moneda_id: number;
}

export interface Ciudad {
  id: number;
  pais_id: number;
  nombre: string;
  latitud: number | null;
  longitud: number | null;
}

export interface Moneda {
  id: number;
  codigo: string;
  nombre: string;
  simbolo: string;
}
