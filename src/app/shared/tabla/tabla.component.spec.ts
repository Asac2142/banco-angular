import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaComponent } from './tabla.component';

describe('TablaComponent', () => {
  let component: TablaComponent;
  let fixture: ComponentFixture<TablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TablaComponent);
    fixture.componentRef.setInput('columns', []);
    fixture.componentRef.setInput('dataSource', []);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
