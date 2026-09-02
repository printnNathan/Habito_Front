import { api } from './client';

export async function criarHabito(dados: any) {
  console.log('URL:', api.defaults.baseURL + '/habito');
  console.log('Authorization:', api.defaults.headers.common.Authorization);

  const response = await api.post('/habito', dados);

  return response.data;
}