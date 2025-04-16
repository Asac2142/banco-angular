import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasComponent } from './cuentas.component';
import { CuentaService } from '../../services/cuenta.service';

describe('CuentasComponent', () => {
  let component: CuentasComponent;
  let fixture: ComponentFixture<CuentasComponent>;
  const mockCuentaService = jasmine.createSpyObj<CuentaService>('CuentaService', [
    'delete',
    'fetchCuentas',
    'getClientes',
    'getCuentas',
    'getCuentasByNumero',
    'save',
    'update'
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentasComponent],
      providers: [{ provide: CuentaService, useValue: mockCuentaService }]
    }).compileComponents();

    fixture = TestBed.createComponent(CuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
