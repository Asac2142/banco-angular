import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private readonly apiURL = environment.apiURL;
  private readonly _http = inject(HttpClient);


}
