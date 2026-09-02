import React from 'react';
import { View, Text, Button } from 'react-native';
import { removerToken } from '../../storage/tokenStorage';
import { styles } from './HomeScreen.styles';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }: any) {
  async function handleLogout() {
    await removerToken();
    navigation.replace('Login');
  }

  return (
    <LinearGradient
      colors={['#39E58C', '#151D1B']}
      start={{ x: 4, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Olá</Text>
      <Text style={styles.subtitle}>Meu app</Text>
    </LinearGradient>
  );
}