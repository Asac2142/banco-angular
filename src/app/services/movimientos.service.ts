import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, take, withLatestFrom } from 'rxjs';

import {
  Movimiento,
  MovimientoPost,
  MovimientoPut,
  MovimientoValues,
  Operacion
} from '../models/movimientos/movimiento.model';
import { ErrorResponse } from '../utils/data.utils';
import { CuentaService } from './cuenta.service';
import { Cuenta } from '../models/cuenta/cuenta.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private readonly apiURL = environment.apiURL;
  private readonly _http = inject(HttpClient);
  private readonly _cuentaService = inject(CuentaService);
  private url = `${this.apiURL}/movimientos`;
  private _movimientos$ = new BehaviorSubject<Movimiento[]>([]);

  getMovimientosByFechas(desde: string, hasta: string, clienteId: number): Observable<Movimiento[]> {
    const endpoint = `${this.url}/cliente/${clienteId}/movimientos?desde=${desde}&hasta=${hasta}`;

    return this._http.get<Movimiento[]>(endpoint).pipe(
      catchError((err: ErrorResponse) => {
        alert(`Error al obtener datos filtrados: ${err.message} ${err.error}`);
        return of([]);
      })
    );
  }

  fetchMovimientosByCuentaId(cuentaId: string): void {
    const endpoint = `${this.url}/${cuentaId}`;

    this._http
      .get<Movimiento[]>(endpoint)
      .pipe(
        take(1),
        catchError((err: ErrorResponse) => {
          alert(`Error al obtener movimientos:  ${err.message} ${err.error}`);
          return of([]);
        })
      )
      .subscribe(res => this._movimientos$.next(res));
  }

  fetchMovimientos(): void {
    this._http
      .get<Movimiento[]>(this.url)
      .pipe(
        take(1),
        catchError((err: ErrorResponse) => {
          alert(`Error al obtener movimientos:  ${err.message} ${err.error}`);
          return of([]);
        })
      )
      .subscribe(res => this._movimientos$.next(res));
  }

  getMovimientos(): Observable<Movimiento[]> {
    return this._movimientos$.asObservable();
  }

  getCuentas(): Observable<Cuenta[]> {
    this._cuentaService.fetchCuentas();
    return this._cuentaService.getCuentas();
  }

  create(data: MovimientoValues): void {
    const body = this._mapToMovimientoPost(data);

    this._http
      .post<Movimiento>(this.url, body)
      .pipe(
        take(1),
        withLatestFrom(this._movimientos$),
        catchError((err: ErrorResponse) => {
          alert(`Error al crear movimiento: ${err.message} ${err.error}`);
          const noMov = {} as Movimiento;
          const emptyArr = [] as Movimiento[];
          const res: Observable<[Movimiento, Movimiento[]]> = of([noMov, emptyArr]);
          return res;
        })
      )
      .subscribe(([response, movimientos]) => {
        if (response?.id) {
          movimientos.push(response);
          this._movimientos$.next(movimientos);
        }
      });
  }

  update(data: MovimientoValues): void {
    const body = this._mapToMovimientoPut(data);

    this._http
      .put<Movimiento>(this.url, body)
      .pipe(
        take(1),
        withLatestFrom(this._movimientos$),
        catchError((err: ErrorResponse) => {
          alert(`Error al actualizar movimiento: ${err.message} ${err.error}`);
          const noMov = {} as Movimiento;
          const emptyArr = [] as Movimiento[];
          const res: Observable<[Movimiento, Movimiento[]]> = of([noMov, emptyArr]);
          return res;
        })
      )
      .subscribe(([response, movimientos]) => {
        if (response?.id) {
          const i = movimientos.findIndex(e => e.id === response.id);
          movimientos[i] = response;
          this._movimientos$.next(movimientos);
        }
      });
  }

  delete(movimientoId: number): void {
    const endpoint = `${this.url}/${movimientoId}`;

    this._http
      .delete<void>(endpoint)
      .pipe(
        take(1),
        withLatestFrom(this._movimientos$),
        catchError((err: ErrorResponse) => {
          alert(`Error al eliminar movimiento: ${err.message} ${err.error}`);
          const res: Observable<[undefined, Movimiento[]]> = of([undefined, []]);
          return res;
        })
      )
      .subscribe(([_, movimientos]) => {
        if (movimientos?.length) {
          const filtered = movimientos.filter(e => e.id !== movimientoId);
          this._movimientos$.next(filtered);
        }
      });
  }

  private _mapToMovimientoPut(data: MovimientoValues): MovimientoPut {
    const op = data.operacion as Operacion;
    const val = data.monto as number;

    return {
      movimientoId: data.movimientoId as number,
      monto: op === 'CREDITO' ? Math.abs(val) : Math.abs(val) * -1
    };
  }

  private _mapToMovimientoPost(data: MovimientoValues): MovimientoPost {
    const op = data.operacion as Operacion;
    const val = data.monto as number;
    return {
      cuentaId: data.cuentaId as number,
      monto: op === 'CREDITO' ? Math.abs(val) : Math.abs(val) * -1
    };
  }
}
