import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionComponent } from './transaccion.component';

describe('TransaccionComponent', () => {
  let component: TransaccionComponent;
  let fixture: ComponentFixture<TransaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransaccionComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TransaccionComponent);
    fixture.componentRef.setInput('cuentas', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
