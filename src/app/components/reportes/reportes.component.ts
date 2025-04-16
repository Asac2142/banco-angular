import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { TablaComponent } from '../../shared/tabla/tabla.component';
import { FiltroComponent } from './filtro/filtro.component';
import { Cliente } from '../../models/cliente/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { ReporteValues } from '../../models/reportes/reporte.model';
import { Movimiento } from '../../models/movimientos/movimiento.model';
import { MovimientosService } from '../../services/movimientos.service';
import { reporteColumnas } from '../../utils/data.utils';

import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reportes',
  imports: [TablaComponent, FiltroComponent, AsyncPipe],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent implements OnInit {
  protected clientes$!: Observable<Cliente[]>;
  protected dataSource$!: Observable<Movimiento[]>;
  protected columnas = reporteColumnas;
  private _clienteService = inject(ClienteService);
  private _movimientoService = inject(MovimientosService);

  ngOnInit(): void {
    this._clienteService.fetchClientes();
    this.clientes$ = this._clienteService.getClientes();
  }

  onFilter({ clienteId, desde, hasta }: ReporteValues): void {
    const d = desde as string;
    const h = hasta as string;
    const id = clienteId as number;
    this.dataSource$ = this._movimientoService.getMovimientosByFechas(d, h, id);
  }

  asPDF(tabla: HTMLTableElement): void {
    const doc = new jsPDF();
    const filename = `movimientos-${new Date().getMilliseconds()}.pdf`;

    autoTable(doc, {
      html: tabla,
      theme: 'grid',
      headStyles: { fillColor: [255, 221, 0], textColor: [0, 0, 0] },
      margin: { top: 10 }
    });

    doc.save(filename);
  }

  toJSON(datos: Movimiento[]): void {
    const asJSON = JSON.stringify(datos);
    const blob = new Blob([asJSON], { type: 'application/json' });
    saveAs(blob);
  }
}
