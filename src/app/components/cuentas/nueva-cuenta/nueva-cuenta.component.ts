import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Cuenta, CuentaForm, CuentaValues } from '../../../models/cuenta/cuenta.model';
import { Cliente } from '../../../models/cliente/cliente.model';
import { noop } from 'rxjs';

@Component({
  selector: 'app-nueva-cuenta',
  imports: [ReactiveFormsModule],
  templateUrl: './nueva-cuenta.component.html',
  styleUrl: './nueva-cuenta.component.scss'
})
export class NuevaCuentaComponent implements OnInit {
  data = input<Cuenta>();
  clientes = input.required<Cliente[]>();
  eliminar = output<number>();
  submit = output<CuentaValues>();
  protected form!: FormGroup<CuentaForm>;

  ngOnInit(): void {
    this._initForm();
  }

  ngOnChanges(): void {
    this._initForm();
  }

  onSave(): void {
    if (this.form.valid) {
      this.submit.emit(this._mapToCuentaValues());
      this.onReset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  onReset(): void {
    this.form.reset();
  }

  onCuentaSelected(): void {
    const id = this.form.controls.clienteId.value;
    if (id) {
      const nombre = this.clientes().find(e => e.id === +id)?.nombre;
      this.form.controls.clienteNombre.patchValue(nombre!);
    }
  }

  private _initForm(): void {
    this.form = new FormGroup<CuentaForm>({
      clienteId: new FormControl(this.data()?.clienteId || null, Validators.required),
      numeroCta: new FormControl(this.data()?.numeroCuenta || null),
      clienteNombre: new FormControl(this.data()?.clienteNombre || null, Validators.required),
      cuentaId: new FormControl(this.data()?.cuentaId || null),
      saldo: new FormControl(this.data()?.saldo || null, [Validators.required, Validators.min(100)]),
      tipoCuenta: new FormControl(this.data()?.tipo || 'AHORROS', Validators.required)
    });

    this.data()?.cuentaId ? this.form.controls.clienteId.disable() : noop;
  }

  private _mapToCuentaValues(): CuentaValues {
    const c = this.form.controls;
    return {
      clienteId: Number(c.clienteId.value),
      clienteNombre: c.clienteNombre.value,
      cuentaId: c.cuentaId.value,
      numeroCta: c.numeroCta.value,
      saldo: c.saldo.value,
      tipoCuenta: c.tipoCuenta.value
    };
  }
}
