import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Cliente, ClienteForm, ClienteValues } from '../../../models/cliente/cliente.model';

@Component({
  selector: 'app-nuevo-cliente',
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.scss'
})
export class NuevoClienteComponent implements OnInit {
  data = input<Cliente>();
  submit = output<ClienteValues>();
  eliminar = output<number>();
  protected form!: FormGroup<ClienteForm>;

  ngOnInit(): void {
    this._initForm();
  }

  ngOnChanges() {
    this._initForm();
  }

  onSave(): void {
    if (this.form.valid) {
      this.submit.emit(this._mapToClienteValues());
      this.onReset();
    } else this.form.markAllAsTouched();
  }

  onReset(): void {
    this.form.reset();
  }

  private _mapToClienteValues(): ClienteValues {
    const c = this.form.controls;
    return {
      direccion: c.direccion.value,
      edad: c.edad.value,
      estado: c.estado.value,
      genero: c.genero.value,
      identificacion: c.identificacion.value,
      nombre: c.nombre.value,
      password: c.password.value,
      telefono: c.telefono.value,
      id: c.id.value
    };
  }

  private _initForm(): void {
    this.form = new FormGroup<ClienteForm>({
      id: new FormControl(this.data()?.id || null),
      direccion: new FormControl(this.data()?.direccion || null, Validators.required),
      edad: new FormControl(this.data()?.edad || null, [Validators.required, Validators.min(0)]),
      estado: new FormControl(this.data()?.estado || false),
      genero: new FormControl(this.data()?.genero || null),
      identificacion: new FormControl(this.data()?.identificacion || null, [
        Validators.required,
        Validators.maxLength(13),
        Validators.minLength(10)
      ]),
      nombre: new FormControl(this.data()?.nombre || null, Validators.required),
      password: new FormControl(this.data()?.password || null, Validators.minLength(8)),
      telefono: new FormControl(this.data()?.telefono || null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(7)
      ])
    });
  }
}
