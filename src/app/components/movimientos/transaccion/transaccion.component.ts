import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { noop } from 'rxjs';

import { Movimiento, MovimientoForm, MovimientoValues } from '../../../models/movimientos/movimiento.model';
import { Cuenta } from '../../../models/cuenta/cuenta.model';

@Component({
  selector: 'app-transaccion',
  imports: [ReactiveFormsModule],
  templateUrl: './transaccion.component.html',
  styleUrl: './transaccion.component.scss'
})
export class TransaccionComponent implements OnInit {
  data = input<Movimiento>();
  cuentas = input.required<Cuenta[]>();
  eliminar = output<number>();
  submit = output<MovimientoValues>();
  protected form!: FormGroup<MovimientoForm>;

  ngOnInit(): void {
    this._initForm();
  }

  ngOnChanges(): void {
    this._initForm();
  }

  onSave(): void {
    if (this.form.valid) {
      this.submit.emit(this._mapToMovimiento());
      this.onReset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  onReset(): void {
    this.form.reset();
    this.form.controls.operacion.patchValue('CREDITO');
  }

  private _initForm(): void {
    this.form = new FormGroup<MovimientoForm>({
      cuentaId: new FormControl(this.data()?.cuentaId || null, Validators.required),
      monto: new FormControl(this.data()?.monto || null, Validators.required),
      operacion: new FormControl(this.data()?.tipoMovimiento || 'CREDITO'),
      movimientoId: new FormControl(this.data()?.id || null)
    });

    this.data()?.id ? this.form.controls.cuentaId.disable() : noop;
  }

  private _mapToMovimiento(): MovimientoValues {
    const c = this.form.controls;
    return {
      movimientoId: c.movimientoId.value,
      cuentaId: c.cuentaId.value,
      monto: c.monto.value,
      operacion: c.operacion.value
    };
  }
}
