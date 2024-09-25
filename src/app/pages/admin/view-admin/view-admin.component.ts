import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  AdminService } from '../../../servicios/admin/admin.service';
import { Admin } from '../../../interfaces/admin';


@Component({
  selector: 'app-view-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './view-admin.component.html',
  styleUrl: './view-admin.component.css'
})
export class ViewAdminComponent implements OnInit {
  admins: Admin[] = [];
  displayedColumns: string[] = ['id', 'adm_nombre', 'adm_apellido', 'adm_cargo', 'adm_telefono', 'adm_email', 'adm_rol_id', 'actions'];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.getAdmins().subscribe({
      next: (data) => {
        this.admins = data;
      },
      error: (error) => {
        console.error('Error fetching admins:', error);
        this.showError('Error al cargar los administradores');
      }
    });
  }
@HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setDisplayedColumns(event.target.innerWidth);
  }

  setDisplayedColumns(width: number) {
    if (width < 400) {
      this.displayedColumns = ['adm_nombre', 'adm_apellido', 'adm_cargo', 'actions'];
    } else if (width < 600) {
      this.displayedColumns = ['adm_nombre', 'adm_apellido', 'adm_cargo', 'adm_telefono', 'adm_email', 'actions'];
    } else {
      this.displayedColumns = ['id', 'adm_nombre', 'adm_apellido', 'adm_cargo', 'adm_telefono', 'adm_email', 'usuario_id', 'actions'];
    }
  }

  openDialog(admin?: Admin) {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      width: '800px',
      data: admin || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.isValidAdmin(result)) {
          if (result.id) {
            this.updateAdmin(result);
          } else {
            this.createAdmin(result);
          }
        } else {
          this.showError('Por favor, complete todos los campos requeridos');
        }
      }
    });
  }

  isValidAdmin(admin: Admin): boolean {
    return !!(admin.adm_nombre && admin.adm_apellido && admin.adm_cargo &&
              admin.adm_telefono && admin.adm_email && admin.usuario_id);
  }

createAdmin(admin: Admin) {
  this.adminService.createAdmin(admin).subscribe({
    next: (createdAdmin) => {
      this.admins.push(createdAdmin);
      this.showSuccess('Administrador creado exitosamente');
    },
    error: (error) => {
      console.error('Error creating admin:', error);
      this.showError('Error al crear el administrador');
    }
  });
}

updateAdmin(admin: Admin) {
  this.adminService.updateAdmin(admin).subscribe({
    next: (updatedAdmin) => {
      const index = this.admins.findIndex(a => a.id === updatedAdmin.id);
      if (index !== -1) {
        this.admins[index] = updatedAdmin;
      }
      this.showSuccess('Administrador actualizado exitosamente');
    },
    error: (error) => {
      console.error('Error updating admin:', error);
      this.showError('Error al actualizar el administrador');
    }
  });
}


  deleteAdmin(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este administrador?')) {
      this.adminService.deleteAdmin(id).subscribe({
        next: () => {
          this.admins = this.admins.filter(admin => admin.id !== id);
          this.showSuccess('Administrador eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error deleting admin:', error);
          this.showError('Error al eliminar el administrador');
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
  selector: 'app-admin-dialog',
  template: `
    <h1 mat-dialog-title>{{data.id ? 'Editar' : 'Crear'}} Administrador</h1>
    <div mat-dialog-content>
      <div class="form-row">
        <mat-form-field appearance="fill">
          <mat-label>Nombre</mat-label>
          <input matInput [(ngModel)]="data.adm_nombre" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Apellido</mat-label>
          <input matInput [(ngModel)]="data.adm_apellido" required>
        </mat-form-field>
      </div>
      <div class="form-row">
        <mat-form-field appearance="fill">
          <mat-label>Cargo</mat-label>
          <input matInput [(ngModel)]="data.adm_cargo" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Teléfono</mat-label>
          <input matInput [(ngModel)]="data.adm_telefono" required>
        </mat-form-field>
      </div>
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Email</mat-label>
        <input matInput [(ngModel)]="data.adm_email" type="email" required>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>ID del Rol</mat-label>
        <input matInput [(ngModel)]="data.usuario_id" type="number" required>
      </mat-form-field>
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
export class AdminDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Admin
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}