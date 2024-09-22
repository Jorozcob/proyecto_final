import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PacienteService } from '../servicios/paciente.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registrar-paciente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  providers:[PacienteService],
  templateUrl: './registrar-paciente.component.html',
  styleUrl: './registrar-paciente.component.css'
})
export class RegistrarPacienteComponent {
patientForm: FormGroup;

  constructor(private fb: FormBuilder, private pacienteSvc: PacienteService) {
    this.patientForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.pacienteSvc.registrarPaciente(this.patientForm.value).subscribe({
        next: (response) => {
          console.log('Paciente registrado con éxito:', response);
          alert('Paciente registrado con éxito');
          this.patientForm.reset();
        },
        error: (err) => {
          console.error('Error al registrar el paciente:', err);
          alert('Error al registrar el paciente');
        }
      });
    }
  } 
}
