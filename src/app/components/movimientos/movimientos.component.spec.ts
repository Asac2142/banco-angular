import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosComponent } from './movimientos.component';
import { MovimientosService } from '../../services/movimientos.service';

describe('MovimientosComponent', () => {
  let component: MovimientosComponent;
  let fixture: ComponentFixture<MovimientosComponent>;
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
      imports: [MovimientosComponent],
      providers: [{ provide: MovimientosService, useValue: mockMovService }]
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
