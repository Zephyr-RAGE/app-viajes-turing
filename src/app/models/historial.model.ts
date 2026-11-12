export interface HistorialCreate {
  ciudad_id: number;
  presupuesto_cop: number;
}

export interface HistorialResponse {
  id: number;
  usuario_id: number;
  ciudad_id: number;
  presupuesto_cop: number | string;
  clima: string;
  tasa: number | string;
  valor_convertido: number | string;
  fecha: string;
}
