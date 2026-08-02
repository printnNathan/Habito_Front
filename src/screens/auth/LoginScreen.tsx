import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { login as loginRequest } from '../../api/authService';
import { salvarToken } from '../../storage/tokenStorage';

export default function LoginScreen({ navigation }: any) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    try {
      const { token } = await loginRequest(login, senha);
      await salvarToken(token);
      navigation.navigate('Home');
    }  catch (error: any) {
        console.log('Erro no login:', error.response?.data || error.message);
        setError('Falha no login. Verifique suas credenciais.');
}
  }

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}