import { api } from './client';

export interface CriarHabitoRequest {
  nome: string;
  descricao: string | null;
  diasSemana: number[];
  horarioInicio: string | null;
  horarioFim: string | null;
  dataInicio: string;
  dataFim: string | null;
  horarioLembrete: string | null;
}

export async function criarHabito(dados: CriarHabitoRequest): Promise<void> {
  await api.post('/api/habito', dados);
}

export interface Habito {
  id: string;
  nome: string;
  descricao?: string | null;
  data_ativacao?: string;
  dataInicio?: string;
  horarioInicio?: string | null;
  fkUsuario?: string;
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
