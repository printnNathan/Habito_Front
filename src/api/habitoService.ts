import { api } from './client';

export async function criarHabito(dados: any) {
  console.log('URL:', api.defaults.baseURL + '/api/habito');
  console.log('Authorization:', api.defaults.headers.common.Authorization);

 const response = await api.post('/api/habito', dados);

  return response.data;
}

export interface Habito{
  id: string;
  nome: string;
  data_ativacao: string;
  fkUsuario: string;
}

export async function listarHabitos(): Promise<Habito[]> {
  const response = await api.get<Habito[]>('/api/habito');
  return response.data;
}