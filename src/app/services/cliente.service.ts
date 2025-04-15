import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, take, withLatestFrom } from 'rxjs';

import { environment } from '../../environments/environment';
import { Cliente, ClienteRequest, ClienteValues, Genero } from '../models/cliente/cliente.model';
import { ErrorResponse } from '../utils/data.utils';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly apiURL = environment.apiURL;
  private readonly _http = inject(HttpClient);
  private _clientes$ = new BehaviorSubject<Cliente[]>([]);
  private url = `${this.apiURL}/clientes`;

  fetchClientes(): void {
    this._http
      .get<Cliente[]>(this.url)
      .pipe(
        take(1),
        catchError((err: ErrorResponse) => {
          alert(`Error al obtener clientes:  ${err.message} ${err.error}`);
          return of([]);
        })
      )
      .subscribe(res => this._clientes$.next(res));
  }

  getClientes(): Observable<Cliente[]> {
    return this._clientes$.asObservable();
  }

  fetchClientesByNombre(nombre: string): void {
    const link = `${this.url}/nombre/${nombre}`;

    this._http
      .get<Cliente[]>(link)
      .pipe(
        take(1),
        catchError((err: ErrorResponse) => {
          alert(`Error al buscar clientes:  ${err.message} ${err.error}`);
          return of([]);
        })
      )
      .subscribe(result => this._clientes$.next(result));
  }

  save(data: ClienteValues): void {
    const payload = this._mapToClienteRequest(data);

    this._http
      .post<Cliente>(this.url, payload)
      .pipe(
        take(1),
        withLatestFrom(this._clientes$),
        catchError((err: ErrorResponse) => {
          alert(`Error al crear cliente: ${err.message} ${err.error}`);
          const noCliente = {} as Cliente;
          const emptyArr = [] as Cliente[];
          const res: Observable<[Cliente, Cliente[]]> = of([noCliente, emptyArr]);
          return res;
        })
      )
      .subscribe(([response, clientes]) => {
        if (response?.id) {
          clientes.push(response);
          this._clientes$.next(clientes);
        }
      });
  }

  update(data: ClienteValues): void {
    const payload = this._mapToClienteRequest(data);
    const link = `${this.url}/${data.id}`;

    this._http
      .put<Cliente>(link, payload)
      .pipe(
        take(1),
        withLatestFrom(this._clientes$),
        catchError((err: ErrorResponse) => {
          alert(`Error al actualizar cliente: ${err.message} ${err.error}`);
          const noCliente = {} as Cliente;
          const emptyArr = [] as Cliente[];
          const res: Observable<[Cliente, Cliente[]]> = of([noCliente, emptyArr]);
          return res;
        })
      )
      .subscribe(([response, clientes]) => {
        if (response?.id) {
          const i = clientes.findIndex(e => e.id === response.id);
          clientes[i] = response;
          this._clientes$.next(clientes);
        }
      });
  }

  delete(id: number): void {
    const link = `${this.url}/${id}`;

    this._http
      .delete<void>(link)
      .pipe(
        take(1),
        withLatestFrom(this._clientes$),
        catchError((err: ErrorResponse) => {
          alert(`Error al eliminar cliente: ${err.message || err.error}`);
          const emptyArr = [] as Cliente[];
          const res: Observable<[undefined, Cliente[]]> = of([undefined, emptyArr]);
          return res;
        })
      )
      .subscribe(([_, clientes]) => {
        if (clientes?.length) {
          const filtered = clientes.filter(e => e.id !== id);
          this._clientes$.next(filtered);
        }
      });
  }

  private _mapToClienteRequest(data: ClienteValues): ClienteRequest {
    return {
      direccion: data.direccion as string,
      edad: data.edad as number,
      estado: true,
      genero: data.genero as Genero,
      identificacion: data.identificacion as string,
      nombre: data.nombre as string,
      password: data.password as string,
      telefono: data.telefono as string
    };
  }
}
