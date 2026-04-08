import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes-list',
  imports: [CommonModule],
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.css',
})
export class ClientesList {
  clientes = [
    {codigo: 'C001', nombre: 'Juan', dui: '1231231', telefono: '12356743', estado:'activo'},
    {codigo: 'C002', nombre: 'Maroia', dui: '9831231', telefono: '12656743', estado:'activo'},
    {codigo: 'C003', nombre: 'Juana', dui: '1281231', telefono: '12336743', estado:'activo'},
  ]
}
