import { Routes } from '@angular/router';

const clienteComp = () => import('./components/clientes/clientes.component').then(c => c.ClientesComponent);
const cuentaComp = () => import('./components/cuentas/cuentas.component').then(c => c.CuentasComponent);
const movimientoComp = () => import('./components/movimientos/movimientos.component').then(c => c.MovimientosComponent);
const reporteComp = () => import('./components/reportes/reportes.component').then(c => c.ReportesComponent);

export const routes: Routes = [
  { path: 'clientes', loadComponent: clienteComp },
  { path: 'cuentas', loadComponent: cuentaComp },
  { path: 'movimientos', loadComponent: movimientoComp },
  { path: 'reportes', loadComponent: reporteComp },
  { path: '**', redirectTo: 'clientes' }
];
