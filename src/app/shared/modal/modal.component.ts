import { DOCUMENT } from '@angular/common';
import { Component, inject, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  private _document = inject(DOCUMENT);
  closeDialog = output<void>();

  showModal(): void {
    this._document.querySelector('dialog')?.showModal();
  }

  closeModal(): void {
    this._document.querySelector('dialog')?.close();
  }
}
