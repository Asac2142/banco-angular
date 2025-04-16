import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { DataSource } from '../../utils/data.utils';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export class TablaComponent {
  columns = input.required<DataSource<any>[]>();
  dataSource = input.required<any[]>();
  rowSelected = output<any>();
  tabla = viewChild<ElementRef>('tabla');

  getTablaHTMLElement(): HTMLTableElement {
    return this.tabla()?.nativeElement;
  }
}
