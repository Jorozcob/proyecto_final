import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PacienteService } from '../../../servicios/pacientes/paciente.service';
import { MatSelectModule } from '@angular/material/select';

// Definición de la interfaz Paciente
export interface Paciente {
  pac_id?: number;
  pac_nombre: string;
  pac_apellido: string;
  pac_fecha_nacimiento: string;
  pac_sexo: 'M' | 'F';
  pac_direccion: string;
  pac_telefono: string;
  pac_email: string;
  pac_estado: 'A' | 'I';
  pac_rol_id: number;
}

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  pacientes: Paciente[] = [];
  displayedColumns: string[] = ['pac_id', 'pac_nombre', 'pac_apellido', 'pac_fecha_nacimiento', 'pac_sexo', 'pac_telefono', 'pac_email', 'actions'];

  constructor(
    private pacienteService: PacienteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadPacientes();
  }

  loadPacientes() {
    this.pacienteService.getPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: (error) => {
        console.error('Error fetching pacientes:', error);
        this.showError('Error al cargar los pacientes');
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setDisplayedColumns(event.target.innerWidth);
  }

  setDisplayedColumns(width: number) {
    if (width < 400) {
      this.displayedColumns = ['pac_nombre', 'pac_apellido', 'actions'];
    } else if (width < 600) {
      this.displayedColumns = ['pac_nombre', 'pac_apellido', 'pac_fecha_nacimiento', 'pac_sexo', 'actions'];
    } else {
      this.displayedColumns = ['pac_id', 'pac_nombre', 'pac_apellido', 'pac_fecha_nacimiento', 'pac_sexo', 'pac_telefono', 'pac_email', 'actions'];
    }
  }

  openDialog(paciente?: Paciente) {
    const dialogRef = this.dialog.open(PacienteDialogComponent, {
      width: '800px',
      data: paciente || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.isValidPaciente(result)) {
          if (result.pac_id) {
            this.updatePaciente(result);
          } else {
            this.createPaciente(result);
          }
        } else {
          this.showError('Por favor, complete todos los campos requeridos');
        }
      }
    });
  }

  isValidPaciente(paciente: Paciente): boolean {
    return !!(paciente.pac_nombre && paciente.pac_apellido && paciente.pac_fecha_nacimiento &&
              paciente.pac_sexo && paciente.pac_direccion && paciente.pac_telefono && 
              paciente.pac_email && paciente.pac_estado && paciente.pac_rol_id);
  }

  createPaciente(paciente: Paciente) {
    this.pacienteService.createPaciente(paciente).subscribe({
      next: (createdPaciente) => {
        this.pacientes.push(createdPaciente);
        this.showSuccess('Paciente creado exitosamente');
      },
      error: (error) => {
        console.error('Error creating paciente:', error);
        this.showError('Error al crear el paciente');
      }
    });
  }

  updatePaciente(paciente: Paciente) {
    this.pacienteService.updatePaciente(paciente).subscribe({
      next: (updatedPaciente) => {
        const index = this.pacientes.findIndex(p => p.pac_id === updatedPaciente.pac_id);
        if (index !== -1) {
          this.pacientes[index] = updatedPaciente;
        }
        this.showSuccess('Paciente actualizado exitosamente');
      },
      error: (error) => {
        console.error('Error updating paciente:', error);
        this.showError('Error al actualizar el paciente');
      }
    });
  }

  deletePaciente(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este paciente?')) {
      this.pacienteService.deletePaciente(id).subscribe({
        next: () => {
          this.pacientes = this.pacientes.filter(paciente => paciente.pac_id !== id);
          this.showSuccess('Paciente eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error deleting paciente:', error);
          this.showError('Error al eliminar el paciente');
        }
      });
    }
  }

  showError(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}

@Component({
  selector: 'app-paciente-dialog',
  template: `
    <h1 mat-dialog-title>{{data.pac_id ? 'Editar' : 'Crear'}} Paciente</h1>
    <div mat-dialog-content>
      <div class="form-row">
        <mat-form-field appearance="fill">
          <mat-label>Nombre</mat-label>
          <input matInput [(ngModel)]="data.pac_nombre" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Apellido</mat-label>
          <input matInput [(ngModel)]="data.pac_apellido" required>
        </mat-form-field>
      </div>
      <div class="form-row">
        <mat-form-field appearance="fill">
          <mat-label>Fecha de Nacimiento</mat-label>
          <input matInput [(ngModel)]="data.pac_fecha_nacimiento" type="date" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Sexo</mat-label>
          <mat-select [(ngModel)]="data.pac_sexo" required>
            <mat-option value="M">Masculino</mat-option>
            <mat-option value="F">Femenino</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Dirección</mat-label>
        <input matInput [(ngModel)]="data.pac_direccion" required>
      </mat-form-field>
      <div class="form-row">
        <mat-form-field appearance="fill">
          <mat-label>Teléfono</mat-label>
          <input matInput [(ngModel)]="data.pac_telefono" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput [(ngModel)]="data.pac_email" type="email" required>
        </mat-form-field>
      </div>
      <div class="form-row">
        <mat-form-field appearance="fill">
          <mat-label>Estado</mat-label>
          <mat-select [(ngModel)]="data.pac_estado" required>
            <mat-option value="A">Activo</mat-option>
            <mat-option value="I">Inactivo</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Rol ID</mat-label>
          <input matInput [(ngModel)]="data.pac_rol_id" type="number" required>
        </mat-form-field>
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="data" cdkFocusInitial>Guardar</button>
    </div>
  `,
  styles: [`
    .form-row {
      display: flex;
      gap: 16px;
    }
    .form-row mat-form-field {
      flex: 1;
    }
    .full-width {
      width: 100%;
    }
    mat-form-field {
      margin-bottom: 16px;
    }
  `],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule
  ]
})
export class PacienteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PacienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Paciente
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}