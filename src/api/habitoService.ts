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
  concluidoHoje: boolean;
}

export async function listarHabitos(): Promise<Habito[]> {
  const response = await api.get<Habito[]>('/api/habito');
  return response.data;
}

export async function marcarHabitoCompleto(habitoId: string): Promise<void> {
  await api.post(`/api/habito/${habitoId}/completo`);
}

export async function desmarcarHabitoCompleto(habitoId: string): Promise<void> {
  await api.delete(`/api/habito/${habitoId}/completo`);
}