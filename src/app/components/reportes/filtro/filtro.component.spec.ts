import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroComponent } from './filtro.component';

describe('FiltroComponent', () => {
  let component: FiltroComponent;
  let fixture: ComponentFixture<FiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroComponent);
    fixture.componentRef.setInput('clientes', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
