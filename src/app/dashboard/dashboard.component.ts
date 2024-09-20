import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion'; // Importa MatExpansionModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule, // Importa el módulo de expansión
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  title = 'Dashboard de Inicio';

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
    // Lógica para agregar paciente
  }

  editarPaciente() {
    console.log('Editar Paciente');
    // Lógica para editar paciente
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


