import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ClienteService } from './cliente.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Subscription } from 'rxjs';
import { Cliente, ClienteValues } from '../models/cliente/cliente.model';

describe('ClienteService', () => {
  let service: ClienteService;
  let httpTesting: HttpTestingController;
  const sub = new Subscription();
  const mockClientes: Cliente[] = [
    {
      direccion: 'foo',
      edad: 11,
      estado: true,
      genero: 'MASCULINO',
      id: 1,
      identificacion: '1234567890',
      nombre: 'Juan',
      password: '123123123',
      telefono: '3232323232'
    }
  ];
  const newCliente: Cliente = {
    direccion: 'foo',
    edad: 11,
    estado: true,
    genero: 'MASCULINO',
    id: 2,
    identificacion: '1234567566',
    nombre: 'David',
    password: '123123123',
    telefono: '3232323232'
  };
  const clienteValues: ClienteValues = {
    direccion: 'foo',
    edad: 11,
    estado: true,
    genero: 'MASCULINO',
    id: 2,
    identificacion: '1234567566',
    nombre: 'David',
    password: '123123123',
    telefono: '3232323232'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ClienteService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  afterAll(() => sub?.unsubscribe());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchs cliente data from API', fakeAsync(() => {
    const url = '/api/v1/clientes';
    service.fetchClientes();

    const req = httpTesting.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockClientes);
    tick();

    sub.add(
      service.getClientes().subscribe(res => {
        expect(res.length).toBe(mockClientes.length);
      })
    );

    tick();
  }));

  it('fetchs clientes by nombre', fakeAsync(() => {
    const nombre = 'ju';
    const url = `/api/v1/clientes/nombre/${nombre}`;
    service.fetchClientesByNombre(nombre);

    const req = httpTesting.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(mockClientes);
    tick();

    sub.add(
      service.getClientes().subscribe(res => {
        expect(res.length).toBe(mockClientes.length);
        expect(res[0].id).toBe(mockClientes[0].id);
      })
    );

    tick();
  }));

  it('sends a POST call to save a cliente', fakeAsync(() => {
    const url = '/api/v1/clientes';
    service.save(clienteValues);

    const req = httpTesting.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).not.toBeUndefined();
    expect(req.request.body).not.toBeNull();
    req.flush(newCliente);

    sub.add(service.getClientes().subscribe());
    tick();
  }));
});
