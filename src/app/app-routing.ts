import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { RegistrarPacienteComponent } from './registrar-paciente/registrar-paciente.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent, // Layout como contenedor principal
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirige a 'dashboard'
      { path: 'dashboard', component: PantallaPrincipalComponent }, // Ruta para el dashboard
      { path: 'registrar-paciente', component: RegistrarPacienteComponent} // Ruta para registrar paciente
    ]
  },
  { path: '**', redirectTo: 'dashboard' } // Cualquier otra ruta redirige a 'dashboard'
];

export const appRouting = provideRouter(routes);
