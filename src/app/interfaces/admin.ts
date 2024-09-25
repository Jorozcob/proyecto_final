export interface Admin1 {
  adm_id?: number;
  adm_nombre: string;
  adm_apellido: string;
  adm_cargo: string;
  adm_telefono: string;
  adm_email: string;
  adm_rol_id: number;
}

export interface Admin {
  id: number;
  adm_nombre: string;
  adm_apellido: string;
  adm_cargo: string;
  adm_telefono: string;
  adm_email: string;
  usuario_id: number;
  created_at: string;
  updated_at: string;
}