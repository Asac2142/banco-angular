export interface Menu {
  id: string;
  label: string;
  link: string;
}

export const menu: Menu[] = [
  { id: 'clientes', label: 'Clientes', link: '/clientes' },
  { id: 'cuentas', label: 'Cuentas', link: '/cuentas' },
  { id: 'movimientos', label: 'Movimientos', link: '/movimientos' },
  { id: 'reportes', label: 'Reportes', link: '/reportes' }
];
