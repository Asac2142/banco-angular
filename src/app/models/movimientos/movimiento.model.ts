export interface MovimientoPostDTO {
  monto: number;
  cuentaId: number;
}

export interface MovimientoResponseDTO {
  fecha: string;
  clienteNombre: string;
  numeroCuenta: string;
  tipoMovimiento: string;
  saldo: number;
  estado: boolean;
  monto: number;
  saldoDisponible: number;
}
