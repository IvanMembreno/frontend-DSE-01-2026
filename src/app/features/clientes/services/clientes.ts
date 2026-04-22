import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  clientes = [
    {codigo: 1, nombre: 'Juan', dui: '12312311-1', telefono: '1235-6743', correo: 'juan@gmail.com', direccion: 'Mejicanos', estado:'Activo'},
    {codigo: 2, nombre: 'Maria', dui: '98312313-3', telefono: '1265-6743', correo: 'maria@gmail.com', direccion: 'Mabañas', estado:'Inactivo'},
    {codigo: 3, nombre: 'Juana', dui: '12812314-4', telefono: '1233-6743', correo: 'juana@gmail.com', direccion: 'San Salvador', estado:'Activo'},
  ]

  getClientes(){
    return this.clientes;
  }

  saveCliente(cliente: any){
    // logica
    const nuevoCodigo = this.clientes.length > 0 ? Math.max(...this.clientes.map(c => c.codigo)) + 1 : 1 // Spread Operator

    cliente.codigo = nuevoCodigo;

    this.clientes.push(cliente)
  }

  getClientePorCodigo(codigoCliente: number) {
    return this.clientes.find(c => c.codigo === codigoCliente);
  }

  updateCliente(codigoCliente: number, cliente: any) {
    const index = this.clientes.findIndex(c => c.codigo === codigoCliente);

    if (index >= 0){

      cliente.codigo = codigoCliente;

      this.clientes[index] = cliente;
    }
  }
}
