import { Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { SearchNewComponent } from '../../shared/search-new/search-new.component';
import { TablaComponent } from '../../shared/tabla/tabla.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { MovimientosService } from '../../services/movimientos.service';
import { Movimiento, MovimientoValues } from '../../models/movimientos/movimiento.model';
import { movimientoColumnas } from '../../utils/data.utils';
import { Cuenta } from '../../models/cuenta/cuenta.model';
import { TransaccionComponent } from './transaccion/transaccion.component';

@Component({
  selector: 'app-movimientos',
  imports: [SearchNewComponent, TablaComponent, ModalComponent, AsyncPipe, TransaccionComponent],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.scss'
})
export class MovimientosComponent implements OnInit {
  private _movService = inject(MovimientosService);
  protected movimientos$!: Observable<Movimiento[]>;
  protected cuentas$!: Observable<Cuenta[]>;
  protected movSeleccionado = signal<Movimiento | null>(null);
  protected showDialog = signal<boolean>(false);
  protected columnas = movimientoColumnas;
  protected seleccionada = signal<string | null>(null);

  ngOnInit(): void {
    this._movService.fetchMovimientos();
    this.movimientos$ = this._movService.getMovimientos();
    this.cuentas$ = this._movService.getCuentas();
  }

  onClearCuenta(selectElem: HTMLSelectElement): void {
    this.seleccionada.set(null);
    this._movService.fetchMovimientos();
    selectElem.selectedIndex = 0;
  }

  onCuenta(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.seleccionada.set(value);
    this._movService.fetchMovimientosByCuentaId(value);
  }

  onMovimiento(modal: ModalComponent): void {
    this.showDialog.set(!this.showDialog());
    this.showDialog() ? modal.showModal() : modal.closeModal();
  }

  onResetSearch(): void {
    this._movService.fetchMovimientos();
  }

  onDelete(id: number): void {
    this._movService.delete(id);
  }

  onSaveMovimiento(data: MovimientoValues): void {
    this.showDialog.set(false);

    if (data?.movimientoId) {
      this._movService.update(data);
    } else {
      this._movService.create(data);
    }
  }
}
