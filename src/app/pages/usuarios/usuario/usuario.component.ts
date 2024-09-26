import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../../../interfaces/usuario';
import { UserService } from '../../../servicios/usuarios/usuario.service';


@Component({
  selector: 'app-usuario',
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
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'usu_nombre', 'rol_id', 'usu_estado', 'actions'];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.showError('Error al cargar los usuarios');
      }
    });
  }

  openDialog(user?: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '300px',
      data: user || {} as User
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.updateUser(result);
        } else {
          this.createUser(result);
        }
      }
    });
  }

  createUser(user: User) {
    this.userService.createUser(user).subscribe({
      next: (createdUser) => {
        this.users.push(createdUser);
        this.showSuccess('Usuario creado exitosamente');
      },
      error: (error) => {
        console.error('Error creating user:', error);
        this.showError('Error al crear el usuario');
      }
    });
  }

  updateUser(user: User) {
    this.userService.updateUser(user).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.showSuccess('Usuario actualizado exitosamente');
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.showError('Error al actualizar el usuario');
      }
    });
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
          this.showSuccess('Usuario eliminado exitosamente');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.showError('Error al eliminar el usuario');
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
  selector: 'app-user-dialog',
  template: `
    <h1 mat-dialog-title>{{data.id ? 'Editar' : 'Crear'}} Usuario</h1>
    <div mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Nombre</mat-label>
        <input matInput [(ngModel)]="data.usu_nombre" required>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>ID del Rol</mat-label>
        <input matInput [(ngModel)]="data.rol_id" type="number" required>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Estado</mat-label>
        <input matInput [(ngModel)]="data.usu_estado" required>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Contraseña</mat-label>
        <input matInput [(ngModel)]="data.usu_pass" type="password" required>
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Guardar</button>
    </div>
  `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ]
})
export class UserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}