import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private baseUrl = 'https://gestorhospital.jpavancestecnologicos.com/api/paciente';
  constructor(private http: HttpClient) {}

  registrarPaciente(patientData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, patientData);
  }
}
