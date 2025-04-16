import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { ClientesComponent } from './clientes.component';
import { ClienteService } from '../../services/cliente.service';
import {
  clienteValues,
  mockClientes,
  MockModalComponent,
  MockNuevoClienteComponent,
  MockSearchNewComponent,
  MockTablaComponent,
  newClienteValues
} from '../../utils/testing/cliente.utils';

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
  const fakeClientes = mockClientes;

  beforeEach(() => mockClienteService.getClientes.and.returnValue(of(fakeClientes)));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ClientesComponent,
        MockSearchNewComponent,
        MockTablaComponent,
        MockNuevoClienteComponent,
        MockModalComponent
      ],
      providers: [{ provide: ClienteService, useValue: mockClienteService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('searches for a client when typing the name', () => {
    const name = of('guille');
    const component = fixture.debugElement.query(By.css('app-search-new'));
    component.triggerEventHandler('inputSearched', name);
    fixture.detectChanges();

    expect(mockClienteService.fetchClientesByNombre).toHaveBeenCalled();
  });

  it('opens up a dialog when creating a new cliente', () => {
    const childComp = fixture.debugElement.query(By.css('app-search-new'));
    const modal = fixture.debugElement.query(By.css('app-modal')).componentInstance;
    spyOn(modal, 'showModal');
    childComp.triggerEventHandler('btnClick', modal);
    fixture.detectChanges();

    expect(modal.showModal).toHaveBeenCalled();
  });

  it('calls "update" when updating a cliente', () => {
    const values = clienteValues;
    const childComp = fixture.debugElement.query(By.css('app-nuevo-cliente'));
    childComp.triggerEventHandler('submit', values);
    fixture.detectChanges();

    expect(mockClienteService.update).toHaveBeenCalledWith(values);
  });

  it('calls "create" when creating a cliente', () => {
    const values = newClienteValues;
    const childComp = fixture.debugElement.query(By.css('app-nuevo-cliente'));
    childComp.triggerEventHandler('submit', values);
    fixture.detectChanges();

    expect(mockClienteService.save).toHaveBeenCalled();
  });

  it('deletes an existing cliente', () => {
    const id = 1;
    const childComp = fixture.debugElement.query(By.css('app-nuevo-cliente'));
    childComp.triggerEventHandler('eliminar', id);
    fixture.detectChanges();

    expect(mockClienteService.delete).toHaveBeenCalledWith(id);
  });
});
