import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, take, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Cuenta, CuentaRequest, CuentaValues, TipoCuenta } from '../models/cuenta/cuenta.model';
import { environment } from '../../environments/environment';
import { ErrorResponse } from '../utils/data.utils';
import { ClienteService } from './cliente.service';
import { Cliente } from '../models/cliente/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  private readonly apiURL = environment.apiURL;
  private readonly _http = inject(HttpClient);
  private readonly _clienteService = inject(ClienteService);
  private _cuenta$ = new BehaviorSubject<Cuenta[]>([]);
  private url = `${this.apiURL}/cuentas`;

  fetchCuentas(): void {
    this._http
      .get<Cuenta[]>(this.url)
      .pipe(
        take(1),
        catchError((err: ErrorResponse) => {
          alert(`Error al obtener cuentas: ${err.message} ${err.error}`);
          return of([]);
        })
      )
      .subscribe(res => this._cuenta$.next(res));
  }

  getClientes(): Observable<Cliente[]> {
    this._clienteService.fetchClientes();
    return this._clienteService.getClientes();
  }

  getCuentas(): Observable<Cuenta[]> {
    return this._cuenta$.asObservable();
  }

  getCuentasByNumero(numero: string): void {
    const endpoint = `${this.url}/${numero}`;

    this._http
      .get<Cuenta[]>(endpoint)
      .pipe(
        take(1),
        catchError((err: ErrorResponse) => {
          alert(`Error al buscar cuenta: ${err.message} ${err.error}`);
          return of([]);
        })
      )
      .subscribe(res => this._cuenta$.next(res));
  }

  save(data: CuentaValues): void {
    const endpoint = `${this.url}/${data.clienteId}`;
    const body = this._mapToCuentaRequest(data);

    this._http
      .post<Cuenta>(endpoint, body)
      .pipe(
        take(1),
        withLatestFrom(this._cuenta$),
        catchError((err: ErrorResponse) => {
          alert(`Error al crear cuenta: ${err.message} ${err.error}`);
          const noCta = {} as Cuenta;
          const emptyArr = [] as Cuenta[];
          const res: Observable<[Cuenta, Cuenta[]]> = of([noCta, emptyArr]);
          return res;
        })
      )
      .subscribe(([response, cuentas]) => {
        if (response?.cuentaId) {
          cuentas.push(response);
          this._cuenta$.next(cuentas);
        }
      });
  }

  update(data: CuentaValues): void {
    const endpoint = `${this.url}/${data.cuentaId}`;
    const body = { saldo: data.saldo, tipo: data.tipoCuenta };

    this._http
      .put<Cuenta>(endpoint, body)
      .pipe(
        take(1),
        withLatestFrom(this._cuenta$),
        catchError((err: ErrorResponse) => {
          alert(`Error al actualizar cuenta: ${err.message} ${err.error}`);
          const noCta = {} as Cuenta;
          const emptyArr = [] as Cuenta[];
          const res: Observable<[Cuenta, Cuenta[]]> = of([noCta, emptyArr]);
          return res;
        })
      )
      .subscribe(([response, cuentas]) => {
        if (response?.cuentaId) {
          const i = cuentas.findIndex(e => e.cuentaId === data.cuentaId && e.clienteId === data.clienteId);
          cuentas[i] = response;
          this._cuenta$.next(cuentas);
        }
      });
  }

  delete(ctaId: number): void {
    const endpoint = `${this.url}/${ctaId}`;

    this._http
      .delete<void>(endpoint)
      .pipe(
        take(1),
        withLatestFrom(this._cuenta$),
        catchError((err: ErrorResponse) => {
          alert(`Error al eliminar cuenta: ${err.message} ${err.error}`);
          const noCta = {} as Cuenta;
          const emptyArr = [] as Cuenta[];
          const res: Observable<[Cuenta, Cuenta[]]> = of([noCta, emptyArr]);
          return res;
        })
      )
      .subscribe(([_, clientes]) => {
        if (clientes?.length) {
          const filtered = clientes.filter(e => e.cuentaId !== ctaId);
          this._cuenta$.next(filtered);
        }
      });
  }

  private _mapToCuentaRequest(data: CuentaValues): CuentaRequest {
    return {
      saldo: data.saldo as number,
      tipo: data.tipoCuenta as TipoCuenta
    };
  }
}
