import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesComponent } from './clientes.component';
import { ClienteService } from '../../services/cliente.service';

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;
  const mockClienteService = jasmine.createSpyObj<ClienteService>('ClienteService', [
    'delete',
    'fetchClientes',
    'fetchClientesByNombre',
    'getClientes',
    'save',
    'update'
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesComponent],
      providers: [{ provide: ClienteService, useValue: mockClienteService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
