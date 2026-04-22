import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../services/clientes';

@Component({
  selector: 'app-clientes-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.css',
})

export class ClientesList {
  clientes: any[] = [];

  constructor(private clienteService: ClienteService){}

  ngOnInit(){
    this.clientes = this.clienteService.getClientes();
  }
}
