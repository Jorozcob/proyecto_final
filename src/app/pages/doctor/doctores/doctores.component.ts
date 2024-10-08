
// doctores.component.ts
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DoctorService } from '../../../servicios/doctor/doctor.service';
import { Doctor } from '../../../interfaces/doctor';

@Component({
  selector: 'app-doctores',
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
    MatSnackBarModule
  ],
  templateUrl: './doctores.component.html',
  styleUrl: './doctores.component.css'
})
export class DoctoresComponent implements OnInit {
  doctors: Doctor[] = [];
  displayedColumns: string[] = ['id', 'med_nombre', 'med_apellido', 'med_telefono', 'med_email', 'med_estado', 'usuario_id', 'actions'];

  constructor(
    private doctorService: DoctorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef // Inyecta el ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.cdr.detectChanges(); // Forzar la detección de cambios
      },
      error: (error) => {
        console.error('Error fetching doctors:', error);
        this.showError('Error al cargar los médicos');
      }
    });
  }

  openDialog(doctor?: Doctor) {
    const dialogRef = this.dialog.open(DoctorDialogComponent, {
      width: '800px',
      data: doctor ? {...doctor} : {} as Doctor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.isValidDoctor(result)) {
          if (result.id) {
            this.updateDoctor(result);
          } else {
            this.createDoctor(result);
          }
        } else {
          this.showError('Por favor, complete todos los campos requeridos');
        }
      }
    });
  }

  isValidDoctor(doctor: Doctor): boolean {
    return !!(doctor.med_nombre && doctor.med_apellido && doctor.med_telefono &&
              doctor.med_email && doctor.med_estado && doctor.usuario_id);
  }

  createDoctor(doctor: Doctor) {
    this.doctorService.createDoctor(doctor).subscribe({
      next: (createdDoctor) => {
        this.doctors.push(createdDoctor);
        this.showSuccess('Médico creado exitosamente');
        this.cdr.detectChanges();  // Forzar la detección de cambios
      },
      error: (error) => {
        console.error('Error creando médico:', error);
        this.showError('Error al crear el médico');
      }
    });
  }
 
  updateDoctor(doctor: Doctor) {
  this.doctorService.updateDoctor(doctor).subscribe({
    next: (updatedDoctor) => {
      const index = this.doctors.findIndex(d => d.id === updatedDoctor.id);
      if (index !== -1) {
        this.doctors[index] = updatedDoctor;
      }
      this.doctors = [...this.doctors];  // Crea una nueva copia del array
      this.showSuccess('Médico actualizado exitosamente');
    },
    error: (error) => {
      console.error('Error actualizando médico:', error);
      this.showError('Error al actualizar el médico');
    }
  });
}

  deleteDoctor(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este médico?')) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: () => {
          this.doctors = this.doctors.filter(doctor => doctor.id !== id);
          this.showSuccess('Médico eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error deleting doctor:', error);
          this.showError('Error al eliminar el médico');
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
  selector: 'app-doctor-dialog',
  template: `
    <h1 mat-dialog-title>{{data.id ? 'Editar' : 'Crear'}} Médico</h1>
    <div mat-dialog-content>
      <div class="form-row">
        <mat-form-field appearance="fill">
          <mat-label>Nombre</mat-label>
          <input matInput [(ngModel)]="data.med_nombre" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Apellido</mat-label>
          <input matInput [(ngModel)]="data.med_apellido" required>
        </mat-form-field>
      </div>
      <div class="form-row">
        <mat-form-field appearance="fill">
          <mat-label>Teléfono</mat-label>
          <input matInput [(ngModel)]="data.med_telefono" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput [(ngModel)]="data.med_email" type="email" required>
        </mat-form-field>
      </div>
      <div class="form-row">
        <mat-form-field appearance="fill">
          <mat-label>Estado</mat-label>
          <input matInput [(ngModel)]="data.med_estado" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>ID del Usuario</mat-label>
          <input matInput [(ngModel)]="data.usuario_id" type="number" required>
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
    FormsModule
  ]
})
export class DoctorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DoctorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Doctor
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
