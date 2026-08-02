import { api } from './client';

interface LoginResponse {
    token: string;
}

export async function login(login: string, senha: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', { login, senha });
  return response.data;
}