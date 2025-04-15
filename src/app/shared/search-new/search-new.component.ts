import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-new',
  imports: [ReactiveFormsModule],
  templateUrl: './search-new.component.html',
  styleUrl: './search-new.component.scss'
})
export class SearchNewComponent implements OnInit {
  buttonLabel = input.required<string>();
  inputSearched = output<Observable<string | null>>();
  btnClick = output<void>();
  clear = output<void>();
  searchField = new FormControl<string | null>(null);

  ngOnInit(): void {
    this.inputSearched.emit(this.searchField.valueChanges);
  }

  onClear(): void {
    this.clear.emit();
    this.searchField.reset();
  }
}
