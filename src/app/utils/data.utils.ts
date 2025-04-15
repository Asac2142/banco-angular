import { Cliente } from '../models/cliente/cliente.model';
import { Cuenta } from '../models/cuenta/cuenta.model';

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
