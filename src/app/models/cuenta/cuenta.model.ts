import { FormControl } from '@angular/forms';

export type TipoCuenta = 'AHORROS' | 'CORRIENTE';

export interface Cuenta {
  numeroCuenta: string;
  tipo: TipoCuenta;
  saldo: number;
  estado: boolean;
  clienteNombre: string;
  cuentaId: number;
  clienteId: number;
}

export interface CuentaRequest {
  saldo: number;
  tipo: TipoCuenta;
}

export interface CuentaForm {
  saldo: FormControl<number | null>;
  tipoCuenta: FormControl<TipoCuenta | null>;
  clienteNombre: FormControl<string | null>;
  numeroCta: FormControl<string | null>;
  cuentaId: FormControl<number | null>;
  clienteId: FormControl<number | null>;
}

export type CuentaValues = {
  [k in keyof CuentaForm]: number | string | TipoCuenta | null;
};
