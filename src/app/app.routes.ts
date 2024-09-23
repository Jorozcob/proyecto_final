import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { ViewAdminComponent } from './pages/admin/view-admin/view-admin.component';

export const routes: Routes = [
   /* {
    path: '',
    component: AppComponent, // Layout como contenedor principal
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirige a 'dashboard'
      { path: 'dashboard', component: PantallaPrincipalComponent }, // Ruta para el dashboard
      { path: 'registrar-paciente', component: RegistrarPacienteComponent}, // Ruta para registrar paciente
      { path: 'registrar-admin', component: ViewAdminComponent} // Ruta para registrar paciente
    ]
  },
  { path: '**', redirectTo: 'dashboard' } // Cualquier otra ruta redirige a 'dashboard'
   */
   
];
