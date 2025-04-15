import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { debounceTime, noop, Observable, startWith, Subscription } from 'rxjs';

import { SearchNewComponent } from '../../shared/search-new/search-new.component';
import { TablaComponent } from '../../shared/tabla/tabla.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { cuentaColumnas } from '../../utils/data.utils';
import { Cuenta, CuentaValues } from '../../models/cuenta/cuenta.model';
import { CuentaService } from '../../services/cuenta.service';
import { NuevaCuentaComponent } from './nueva-cuenta/nueva-cuenta.component';
import { Cliente } from '../../models/cliente/cliente.model';

@Component({
  selector: 'app-cuentas',
  imports: [SearchNewComponent, TablaComponent, ModalComponent, AsyncPipe, NuevaCuentaComponent],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.scss'
})
export class CuentasComponent implements OnInit, OnDestroy {
  protected columnas = cuentaColumnas;
  protected datasource$!: Observable<Cuenta[]>;
  protected clientes$!: Observable<Cliente[]>;
  protected showDialog = signal<boolean>(false);
  protected cuentaSeleccionada = signal<Cuenta | null>(null);
  private _cuentaService = inject(CuentaService);
  private _sub = new Subscription();

  ngOnInit(): void {
    this.clientes$ = this._cuentaService.getClientes();
    this._cuentaService.fetchCuentas();
    this.datasource$ = this._cuentaService.getCuentas();
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  onValueChanges(data: Observable<string | null>): void {
    this._sub.add(
      data
        .pipe(startWith(''), debounceTime(500))
        .subscribe(text => (text ? this._cuentaService.getCuentasByNumero(text) : noop))
    );
  }

  onNewCta(modal: ModalComponent): void {
    this.showDialog.set(!this.showDialog());
    this.showDialog() ? modal.showModal() : modal.closeModal();
  }

  onResetSearch(): void {
    this._cuentaService.fetchCuentas();
  }

  onDelete(ctaId: number): void {
    this._cuentaService.delete(ctaId);
  }

  onSaveCuenta(data: CuentaValues): void {
    this.showDialog.set(false);

    if (data?.cuentaId) {
      this._cuentaService.update(data);
    } else {
      this._cuentaService.save(data);
    }
  }
}
