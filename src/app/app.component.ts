import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component'; // Importa el DashboardComponent

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="main-container">
      <app-dashboard class="sidebar"></app-dashboard> <!-- Sidebar siempre visible -->
      <div class="content">
        <router-outlet></router-outlet> <!-- Aquí se cargarán las rutas -->
      </div>
    </div>
  `,
  styles: [
    `
      .main-container {
        display: flex;
        height: 100vh;
      }

      .sidebar {
        width: 250px; /* Ancho del dashboard */
        background-color: #3f51b5; /* Color de fondo del dashboard */
      }

      .content {
        flex-grow: 1;
        padding: 20px;
        background-color: #f5f5f5; /* Color de fondo para el contenido */
      }
    `
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardComponent // Importa el DashboardComponent
  ]
})
export class AppComponent {}
