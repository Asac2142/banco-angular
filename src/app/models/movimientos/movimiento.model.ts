import { FormControl } from '@angular/forms';
import { TipoCuenta } from '../cuenta/cuenta.model';

export type Operacion = 'DEBITO' | 'CREDITO';

export interface MovimientoPost {
  monto: number;
  cuentaId: number;
}

export interface MovimientoPut {
  movimientoId: number;
  monto: number;
}

export interface Movimiento {
  id: number;
  cuentaId: number;
  fecha: string;
  clienteNombre: string;
  numeroCuenta: string;
  cuentaTipo: TipoCuenta;
  tipoMovimiento: Operacion;
  saldo: number;
  estado: boolean;
  monto: number;
  saldoDisponible: number;
}

export interface MovimientoForm {
  movimientoId: FormControl<number | null>;
  cuentaId: FormControl<number | null>;
  monto: FormControl<number | null>;
  operacion: FormControl<Operacion | null>;
}

export type MovimientoValues = {
  [k in keyof MovimientoForm]: number | Operacion | null;
};
