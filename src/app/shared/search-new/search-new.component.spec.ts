import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNewComponent } from './search-new.component';

describe('SearchNewComponent', () => {
  let component: SearchNewComponent;
  let fixture: ComponentFixture<SearchNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchNewComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchNewComponent);
    fixture.componentRef.setInput('showSearch', true);
    fixture.componentRef.setInput('buttonLabel', 'New');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
