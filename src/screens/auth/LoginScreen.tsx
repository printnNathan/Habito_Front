import React, { useState } from 'react';
import { TextInput, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { login as loginRequest } from '../../api/authService';
import { salvarToken } from '../../storage/tokenStorage';
import { styles } from './LoginScreen.styles';
import { definirToken } from '../../api/client';

export default function LoginScreen({ navigation }: any) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    try {
      const { token } = await loginRequest(login, senha);
      await salvarToken(token);
      definirToken(token);
      navigation.navigate('Home');
    } catch (error: any) {
      console.log('Erro no login:', error.response?.data || error.message);
      setError('Falha no login. Verifique suas credenciais.');
    }
  }

  return (
    <LinearGradient
      colors={['#000000', '#0B2818', '#39E58C']}
      style={styles.container}
    >
      <Text style={styles.title}>Habitos</Text>

      <TextInput
        placeholder="Login"
        placeholderTextColor="#999999"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#999999"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}