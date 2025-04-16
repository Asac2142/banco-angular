import { Cliente } from '../models/cliente/cliente.model';
import { Cuenta } from '../models/cuenta/cuenta.model';
import { Movimiento } from '../models/movimientos/movimiento.model';

export interface Menu {
  id: string;
  label: string;
  link: string;
}

export interface DataSource<T> {
  id: keyof T;
  label: string;
}

export interface ErrorResponse {
  status: number;
  error: string;
  message: string;
  details: any;
}

export const menu: Menu[] = [
  { id: 'clientes', label: 'Clientes', link: '/clientes' },
  { id: 'cuentas', label: 'Cuentas', link: '/cuentas' },
  { id: 'movimientos', label: 'Movimientos', link: '/movimientos' },
  { id: 'reportes', label: 'Reportes', link: '/reportes' }
];

export const clienteColumnas: DataSource<Cliente>[] = [
  { id: 'nombre', label: 'Nombres' },
  { id: 'direccion', label: 'Direccion' },
  { id: 'telefono', label: 'Telefono' },
  { id: 'estado', label: 'Estado' }
];

export const cuentaColumnas: DataSource<Cuenta>[] = [
  { id: 'numeroCuenta', label: 'Cuenta' },
  { id: 'tipo', label: 'Tipo' },
  { id: 'saldo', label: 'Saldo Inicial' },
  { id: 'estado', label: 'Estado' },
  { id: 'clienteNombre', label: 'Cliente' }
];

export const movimientoColumnas: DataSource<Movimiento>[] = [
  { id: 'numeroCuenta', label: 'Cuenta' },
  { id: 'cuentaTipo', label: 'Tipo' },
  { id: 'saldo', label: 'Saldo Inicial' },
  { id: 'estado', label: 'Estado' },
  { id: 'monto', label: 'Monto' },
  { id: 'tipoMovimiento', label: 'Tipo movimiento' }
];

export const reporteColumnas: DataSource<Movimiento>[] = [
  { id: 'fecha', label: 'Fecha' },
  { id: 'clienteNombre', label: 'Cliente' },
  { id: 'numeroCuenta', label: 'Cuenta' },
  { id: 'cuentaTipo', label: 'Tipo' },
  { id: 'saldo', label: 'Saldo Inicial' },
  { id: 'estado', label: 'Estado' },
  { id: 'monto', label: 'Movimiento' },
  { id: 'saldoDisponible', label: 'Saldo Disponible' }
];
