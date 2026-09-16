import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { criarHabito } from '../../api/habitoService';

export default function NovoHabitoScreen() {
  const [nome, setNome] = useState('');
  const [dataAtivacao, setDataAtivacao] = useState('2026-07-19');
  const [loading, setLoading] = useState(false);

  // Depois vamos pegar esse id do AuthContext
  const usuarioId = 'b74a07f2-9041-4eaa-8bd7-c2a74b8b4758';

  async function salvar() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Digite o nome do hábito.');
      return;
    }

    const payload = {
    nome,
    data_ativacao: dataAtivacao,
    fk_usuario: usuarioId,
  };
    console.log('Payload:', JSON.stringify(payload, null, 2));


    try {
      setLoading(true);

      await criarHabito({
        nome,
        data_ativacao: dataAtivacao,
        fk_usuario: usuarioId,
      });

      Alert.alert('Sucesso', 'Hábito criado!');

      setNome('');
    } catch (error: any) {
  console.log('Status:', error.response?.status);
  console.log('Data:', error.response?.data);
  console.log('Message:', error.message);
  Alert.alert('Erro', 'Não foi possível criar o hábito.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: 'bold',
          marginBottom: 8,
        }}
      >
        Novo Hábito
      </Text>

      <Text
        style={{
          color: '#666',
          marginBottom: 24,
        }}
      >
        Crie um novo hábito para acompanhar diariamente.
      </Text>

      <TextInput
        placeholder="Ex: Beber água"
        value={nome}
        onChangeText={setNome}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 12,
          padding: 14,
          marginBottom: 16,
        }}
      />

      <TextInput
        placeholder="AAAA-MM-DD"
        value={dataAtivacao}
        onChangeText={setDataAtivacao}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 12,
          padding: 14,
          marginBottom: 24,
        }}
      />

      <TouchableOpacity
        onPress={salvar}
        disabled={loading}
        style={{
          backgroundColor: '#39E58C',
          padding: 16,
          borderRadius: 12,
          alignItems: 'center',
        }}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={{ fontWeight: 'bold' }}>Criar Hábito</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}