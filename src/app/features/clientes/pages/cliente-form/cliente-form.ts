import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ClienteService } from '../../services/clientes';

@Component({
  selector: 'app-cliente-form',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})
export class ClienteForm {

  private fb =inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Formulario
  clienteForm!: FormGroup;

  // edicion
  codigoCliente: number | null = null;
  editando = false;

  // Inicializador del componente
  ngOnInit(): void {
    this.buildForm();
    this.cargarClienteSiEdicion()
  }

  // crear una funcion 
  cargarClienteSiEdicion(): void {
    const codigoParametro = this.route.snapshot.paramMap.get('codigo');

    if (!codigoParametro) return;

    this.codigoCliente = Number(codigoParametro);
    this.editando = true;

    const cliente = this.clienteService.getClientePorCodigo(this.codigoCliente);

    if (!cliente) {
      this.router.navigate(['/clientes']);
      return;
    }

    this.clienteForm.patchValue({ // get, post, put, delete, patch, option
      nombre: cliente.nombre,
      dui: cliente.dui,
      telefono: cliente.telefono,
      correo: cliente.correo,
      direccion: cliente.direccion,
      estado: cliente.estado,
    })
  } 

  // Método vacio para construir
  buildForm(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      dui: ['', [Validators.required, Validators.pattern(/^\d{8}-\d$/)]], // expresion regex
      telefono: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.maxLength(150)]],
      estado: ['Activo', [Validators.required]]
    })
  }

  // Método para guardar la información del cliente.
  guardar(): void {
    // Verificación de la validez del formulario.
    if (this.clienteForm.invalid) {
      // Si es inválido, marca todos los campos como 'tocados' para mostrar errores.
      this.clienteForm.markAllAsTouched();
      return;
    }

    // Creación del objeto cliente a partir de los valores del formulario.
    const cliente = this.clienteForm.value;

    if (this.editando && this.codigoCliente != null){
      // Llamada al servicio para persistir los datos del cliente.
      this.clienteService.updateCliente(this.codigoCliente, cliente);
    } else {
      // Llamada al servicio para persistir los datos del cliente.
      this.clienteService.saveCliente(cliente);
    }

    // Navegación a la lista de clientes después de un guardado exitoso.
    this.router.navigate(['/clientes']);
  }

  // getter && setters
  get nombre() {
    return this.clienteForm.get('nombre');
  }

  get dui() {
    return this.clienteForm.get('dui');
  }

  get telefono() {
    return this.clienteForm.get('telefono');
  }

  get correo() {
    return this.clienteForm.get('correo');
  }

  get direccion() {
    return this.clienteForm.get('direcion');
  }

  get estado() {
    return this.clienteForm.get('estado');
  }
}
