import { Component, output, input } from '@angular/core';
import { Cliente, ClienteValues } from '../../models/cliente/cliente.model';

export const mockClientes: Cliente[] = [
  {
    direccion: 'direccion1',
    edad: 11,
    estado: true,
    genero: 'MASCULINO',
    id: 1,
    identificacion: '1458745421',
    nombre: 'Guillermo',
    password: '12312333',
    telefono: '06874877888'
  },
  {
    direccion: 'direccion2',
    edad: 22,
    estado: true,
    genero: 'MASCULINO',
    id: 2,
    identificacion: '1458745420',
    nombre: 'Andres',
    password: '12312366',
    telefono: '06874877800'
  },
  {
    direccion: 'direccion3',
    edad: 33,
    estado: true,
    genero: 'MASCULINO',
    id: 3,
    identificacion: '1458745426',
    nombre: 'Bob',
    password: '12312344',
    telefono: '06874877877'
  }
];

export const clienteValues: ClienteValues = {
  direccion: 'direccion1',
  edad: 11,
  estado: true,
  genero: 'MASCULINO',
  id: 1,
  identificacion: '1458745421',
  nombre: 'Guillermo',
  password: '12312333',
  telefono: '06874877888'
};

export const newClienteValues: ClienteValues = {
  direccion: 'direccion1',
  edad: null,
  estado: true,
  genero: 'MASCULINO',
  id: null,
  identificacion: '1458745421',
  nombre: 'Guillermo',
  password: '12312333',
  telefono: '06874877888'
};

@Component({
  selector: 'app-modal',
  template: ''
})
export class MockModalComponent {
  closeDialog = output<void>();
  showModal = jasmine.createSpy('showModal');
  closeModal = jasmine.createSpy('closeModal');
}

@Component({
  selector: 'app-tabla',
  template: ''
})
export class MockTablaComponent {
  columns = input<any>();
  dataSource = input<any>();
  rowSelected = output<any>();
}

@Component({
  selector: 'app-nuevo-cliente',
  template: ''
})
export class MockNuevoClienteComponent {
  data = input<any>;
  eliminar = output<any>();
  submit = output<any>();
}

@Component({
  selector: 'app-search-new',
  template: ''
})
export class MockSearchNewComponent {
  buttonLabel = input<string | undefined>();
  inputSearched = output<any>();
  btnClick = output<any>();
  clear = output<void>();
}
