import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesComponent } from './reportes.component';
import { ClienteService } from '../../services/cliente.service';
import { MovimientosService } from '../../services/movimientos.service';

describe('ReportesComponent', () => {
  let component: ReportesComponent;
  let fixture: ComponentFixture<ReportesComponent>;
  const mockClienteService = jasmine.createSpyObj<ClienteService>('ClienteService', [
    'delete',
    'fetchClientes',
    'fetchClientesByNombre',
    'getClientes',
    'save',
    'update'
  ]);
  const mockMovService = jasmine.createSpyObj<MovimientosService>('MovimientosService', [
    'create',
    'delete',
    'fetchMovimientos',
    'fetchMovimientosByCuentaId',
    'getCuentas',
    'getMovimientos',
    'getMovimientosByFechas',
    'update'
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesComponent],
      providers: [
        { provide: ClienteService, useValue: mockClienteService },
        { provide: MovimientosService, useValue: mockMovService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
