import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

export async function salvarToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function obterToken(): Promise<string | null> {
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function removerToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}