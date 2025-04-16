import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { debounceTime, noop, Observable, startWith, Subscription } from 'rxjs';

import { SearchNewComponent } from '../../shared/search-new/search-new.component';
import { clienteColumnas } from '../../utils/data.utils';
import { TablaComponent } from '../../shared/tabla/tabla.component';
import { ClienteService } from '../../services/cliente.service';
import { Cliente, ClienteValues } from '../../models/cliente/cliente.model';
import { ModalComponent } from '../../shared/modal/modal.component';
import { NuevoClienteComponent } from './nuevo-cliente/nuevo-cliente.component';

@Component({
  selector: 'app-clientes',
  imports: [SearchNewComponent, TablaComponent, AsyncPipe, ModalComponent, NuevoClienteComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements OnInit, OnDestroy {
  protected columnas = clienteColumnas;
  protected data$!: Observable<Cliente[]>;
  protected showDialog = signal<boolean>(false);
  protected clienteSeleccionado = signal<Cliente | null>(null);
  private _clienteService = inject(ClienteService);
  private _sub = new Subscription();

  ngOnInit(): void {
    this._clienteService.fetchClientes();
    this.data$ = this._clienteService.getClientes();
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }

  onValueChanges(data: Observable<string | null>): void {
    this._sub.add(
      data
        .pipe(startWith(''), debounceTime(500))
        .subscribe(text => (text ? this._clienteService.fetchClientesByNombre(text) : noop))
    );
  }

  onResetSearch(): void {
    this._clienteService.fetchClientes();
  }

  onNuevoCliente(modal: ModalComponent): void {
    this.showDialog.set(!this.showDialog());
    this.showDialog() ? modal.showModal() : modal.closeModal();
  }

  onSaveCliente(data: ClienteValues): void {
    this.showDialog.set(false);

    if (data.id !== null) {
      this._clienteService.update(data);
    } else {
      this._clienteService.save(data);
    }
  }

  onDelete(id: number): void {
    this._clienteService.delete(id);
  }
}
