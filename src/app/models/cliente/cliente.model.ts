import { FormControl } from '@angular/forms';
import { TipoCuenta } from '../cuenta/cuenta.model';

export type Genero = 'MASCULINO' | 'FEMENINO';

export interface Cliente {
  id: number;
  nombre: string;
  genero: Genero;
  edad: number;
  identificacion: string;
  direccion: string;
  telefono: string;
  estado: boolean;
  password: string;
}

export interface ClienteForm {
  id: FormControl<number | null>;
  nombre: FormControl<string | null>;
  genero: FormControl<Genero | null>;
  edad: FormControl<number | null>;
  identificacion: FormControl<string | null>;
  direccion: FormControl<string | null>;
  password: FormControl<string | null>;
  estado: FormControl<boolean | null>;
  telefono: FormControl<string | null>;
}

export interface ClienteRequest {
  nombre: string;
  genero: Genero;
  edad: number;
  identificacion: string;
  direccion: string;
  telefono: string;
  password: string;
  estado: boolean;
}

export type ClienteValues = {
  [k in keyof ClienteForm]: string | number | Genero | TipoCuenta | boolean | null;
};
