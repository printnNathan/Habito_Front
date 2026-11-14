import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { removerToken } from '../../storage/tokenStorage';
import { listarHabitos, marcarHabitoCompleto, desmarcarHabitoCompleto, Habito } from '../../api/habitoService';
import { COLORS, styles } from './HomeScreen.styles';
import ResumoDiaCard from '../../components/resumoDiaCard/ResumoDiaCard';
import { formatarDataHoje, gerarSaudacao } from '../../utils/dataSaudacao';

export function BottomNavigation({ navigation, active = 'Home' }: any) {
  return <View style={styles.tabBar}><TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}><Text style={[styles.tabText, active === 'Home' && styles.tabTextActive]}>Hoje</Text></TouchableOpacity><TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Jornada')}><Text style={[styles.tabText, active === 'Jornada' && styles.tabTextActive]}>Jornada</Text></TouchableOpacity><TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CriarHabito')}><Text style={styles.addButtonText}>+</Text></TouchableOpacity><TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Insights')}><Text style={[styles.tabText, active === 'Insights' && styles.tabTextActive]}>Insights</Text></TouchableOpacity><TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Perfil')}><Text style={[styles.tabText, active === 'Perfil' && styles.tabTextActive]}>Perfil</Text></TouchableOpacity></View>;
}

export function PlaceholderScreen({ navigation, route }: any) {
  const title = route.name;
  return <View style={styles.placeholder}><Text style={styles.placeholderTitle}>{title}</Text><Text style={styles.placeholderText}>Em breve</Text><BottomNavigation navigation={navigation} active={route.name} /></View>;
}

export default function HomeScreen({ navigation }: any) {
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const carregarHabitos = useCallback(async () => {
    try { setHabitos(await listarHabitos()); }
    catch (error: any) { console.log('Erro ao listar hábitos:', error.response?.status, error.response?.data); }
  }, []);

  useFocusEffect(useCallback(() => {
    let mounted = true;
    (async () => { setLoading(true); await carregarHabitos(); if (mounted) setLoading(false); })();
    return () => { mounted = false; };
  }, [carregarHabitos]));

  const onRefresh = useCallback(async () => { setRefreshing(true); await carregarHabitos(); setRefreshing(false); }, [carregarHabitos]);
  const total = habitos.length;
  const concluidos = habitos.filter((h) => h.concluidoHoje).length;
  const ordenados = [...habitos].sort((a, b) => Number(a.concluidoHoje) - Number(b.concluidoHoje));
  const proximos = habitos.filter((habito) => Boolean(habito.horarioInicio));

  async function handleToggleConcluido(habito: Habito) {
    const concluidoAnterior = habito.concluidoHoje;
    setHabitos((prev) => prev.map((h) => h.id === habito.id ? { ...h, concluidoHoje: !concluidoAnterior } : h));
    try {
      if (concluidoAnterior) await desmarcarHabitoCompleto(habito.id);
      else await marcarHabitoCompleto(habito.id);
    } catch (error: any) {
      console.log('Erro ao alternar conclusão:', error.response?.status, error.response?.data);
      setHabitos((prev) => prev.map((h) => h.id === habito.id ? { ...h, concluidoHoje: concluidoAnterior } : h));
    }
  }

  async function handleLogout() { await removerToken(); navigation.replace('Login'); }
  return <LinearGradient colors={[COLORS.background, '#171C19']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
    <View style={styles.header}><Text style={styles.data}>{formatarDataHoje().toLocaleUpperCase('pt-BR')}</Text><Text style={styles.saudacao}>{gerarSaudacao()}</Text></View>
    {loading ? <ActivityIndicator color="#79D9AE" style={styles.loader} /> : <FlatList data={ordenados} keyExtractor={(item) => item.id} style={styles.listaHabitos} contentContainerStyle={styles.listaHabitosContent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#79D9AE" />} ListHeaderComponent={<><ResumoDiaCard total={total} concluidos={concluidos} /><Text style={styles.sectionTitle}>Em foco</Text></>} ListEmptyComponent={<Text style={styles.emptyText}>Nenhum hábito para hoje. Toque no + para criar o primeiro.</Text>} renderItem={({ item }) => <View style={styles.habitoCard}><TouchableOpacity style={[styles.checkbox, item.concluidoHoje && styles.checkboxMarcado]} onPress={() => handleToggleConcluido(item)} accessibilityRole="checkbox" accessibilityState={{ checked: item.concluidoHoje }}>{item.concluidoHoje && <Text style={styles.checkboxIcone}>✓</Text>}</TouchableOpacity><View style={styles.habitoInfo}><Text style={[styles.habitoNome, item.concluidoHoje && styles.habitoNomeConcluido]}>{item.nome}</Text>{item.descricao ? <Text style={styles.habitoData}>{item.descricao}</Text> : null}</View></View>} ListFooterComponent={<>{proximos.length > 0 && <><Text style={styles.sectionTitle}>Próximo</Text>{[...proximos].sort((a, b) => String(a.horarioInicio).localeCompare(String(b.horarioInicio))).map((item) => <View key={`next-${item.id}`} style={styles.nextCard}><Text style={styles.nextTime}>{item.horarioInicio}</Text><Text style={styles.nextName}>{item.nome}</Text></View>)}</>}<TouchableOpacity style={styles.logout} onPress={handleLogout}><Text style={styles.logoutText}>Sair</Text></TouchableOpacity></>} />}
    <BottomNavigation navigation={navigation} active="Home" />
  </LinearGradient>;
}
