import { Component, input, OnInit, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

import { ReporteForm, ReporteValues } from '../../../models/reportes/reporte.model';
import { Cliente } from '../../../models/cliente/cliente.model';

@Component({
  selector: 'app-filtro',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroComponent implements OnInit {
  clientes = input.required<Cliente[]>();
  submit = output<ReporteValues>();
  protected form!: FormGroup<ReporteForm>;

  ngOnInit(): void {
    this._initForm();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submit.emit(this._mapToReporteValues());
    } else {
      this.form.markAllAsTouched();
    }
  }

  private _initForm(): void {
    this.form = new FormGroup<ReporteForm>({
      clienteId: new FormControl(null, Validators.required),
      desde: new FormControl(null, [Validators.required, this._validarDesde()]),
      hasta: new FormControl(null, [Validators.required, this._validateHasta()])
    });
  }

  private _mapToReporteValues(): ReporteValues {
    const c = this.form.controls;
    return {
      clienteId: c.clienteId.value,
      desde: c.desde.value,
      hasta: c.hasta.value
    };
  }

  private _validarDesde(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.form?.controls?.hasta?.value) return null;
      if (!control.value) return null;

      const hasta = new Date(this.form.controls.hasta.value || '');
      const desde = new Date(control.value || '');
      return desde <= hasta ? null : { desdeError: { value: control.value } };
    };
  }

  private _validateHasta(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.form?.controls?.desde?.value) return null;
      if (!control.value) return null;

      const desde = new Date(this.form.controls.desde.value || '');
      const hasta = new Date(control.value || '');
      return hasta >= desde ? null : { hastaError: { value: control.value } };
    };
  }
}
