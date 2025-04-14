import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly apiURL = environment.apiURL;
  private readonly _http = inject(HttpClient);

  getClientes(): Observable<Cliente[]> {
    const url = `${this.apiURL}/clientes`;
    return this._http.get<Cliente[]>(url);
  }
}
