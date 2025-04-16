import { FormControl } from '@angular/forms';

export interface ReporteForm {
  clienteId: FormControl<number | null>;
  desde: FormControl<string | null>;
  hasta: FormControl<string | null>;
}

export type ReporteValues = {
  [k in keyof ReporteForm]: number | string | null;
};
