import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

import { removerToken } from '../../storage/tokenStorage';
import { listarHabitos, Habito } from '../../api/habitoService';
import { COLORS, styles } from './HomeScreen.styles';

export default function HomeScreen({ navigation }: any) {
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function carregarHabitos() {
    try {
      const dados = await listarHabitos();
      setHabitos(dados);
    } catch (error: any) {
      console.log('Erro ao listar hábitos:', error.response?.status, error.response?.data);
    }
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setLoading(true);
        await carregarHabitos();
        setLoading(false);
      })();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await carregarHabitos();
    setRefreshing(false);
  }, []);

  async function handleLogout() {
    await removerToken();
    navigation.replace('Login');
  }

  function handleCriarHabito() {
    navigation.navigate('CriarHabito');
  }

  return (
    <LinearGradient
      colors={[COLORS.primary, '#1c2e28']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>olá, seja bem-vindo!</Text>
      <Text style={styles.subtitle}>Meu app</Text>

      {loading ? (
        <ActivityIndicator color="#fff" style={styles.loader} />
      ) : (
        <FlatList
          data={habitos}
          keyExtractor={(item) => item.id}
          style={styles.listaHabitos}
          contentContainerStyle={styles.listaHabitosContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Nenhum hábito cadastrado ainda. Toque no + para criar o primeiro.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.habitoCard}>
              <Text style={styles.habitoNome}>{item.nome}</Text>
              <Text style={styles.habitoData}>Ativo desde {item.data_ativacao}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleCriarHabito}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}