import { Component, inject, OnInit } from '@angular/core';

import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MainComponent } from './shared/main/main.component';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SidebarComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private _clienteService = inject(ClienteService);

  ngOnInit(): void {
    // this._clienteService.getClientes().subscribe(console.log);
  }
}
