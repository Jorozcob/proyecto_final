import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion'; // Importa los módulos necesarios
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, MatExpansionModule, RouterModule] // Importa módulos necesarios
})
export class DashboardComponent {
  // Lógica del dashboard aquí (menú, enlaces, etc.)



  title = 'Dashboard de Inicio';

  constructor(private router: Router) {} // Inyecta el servicio Router


  // Métodos para Médicos
  agregarMedico() {
    console.log('Agregar Médico');
    // Lógica para agregar médico
  }

  editarMedico() {
    console.log('Editar Médico');
    // Lógica para editar médico
  }

  borrarMedico() {
    console.log('Borrar Médico');
    // Lógica para borrar médico
  }

  // Métodos para Pacientes
  agregarPaciente() {
    console.log('Agregar Paciente');
    this.router.navigate(['/registrar-paciente']);

    // Lógica para agregar paciente
  }

  editarPaciente() {
    console.log('Editar Paciente');
    // Lógica para editar paciente
    this.router.navigate(['/dashboard']);
  }

  borrarPaciente() {
    console.log('Borrar Paciente');
    // Lógica para borrar paciente
  }

  // Métodos para Especialidad
  agregarEspecialidad() {
    console.log('Agregar Especialidad');
    // Lógica para agregar especialidad
  }

  editarEspecialidad() {
    console.log('Editar Especialidad');
    // Lógica para editar especialidad
  }

  borrarEspecialidad() {
    console.log('Borrar Especialidad');
    // Lógica para borrar especialidad
  }

  // Métodos para Receta
  agregarReceta() {
    console.log('Agregar Receta');
    // Lógica para agregar receta
  }

  editarReceta() {
    console.log('Editar Receta');
    // Lógica para editar receta
  }

  borrarReceta() {
    console.log('Borrar Receta');
    // Lógica para borrar receta
  }

  // Métodos para Alergias
  agregarAlergia() {
    console.log('Agregar Alergia');
    // Lógica para agregar alergia
  }

  editarAlergia() {
    console.log('Editar Alergia');
    // Lógica para editar alergia
  }

  borrarAlergia() {
    console.log('Borrar Alergia');
    // Lógica para borrar alergia
  }
}


