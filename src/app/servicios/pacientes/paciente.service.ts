import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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


@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'https://gestorhospital.jpavancestecnologicos.com/api/paciente';

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  getPaciente(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  createPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }

  updatePaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${paciente.pac_id}`, paciente);
  }

  deletePaciente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}