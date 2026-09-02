import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { removerToken } from '../../storage/tokenStorage';
import { COLORS, styles } from './HomeScreen.styles';

export default function HomeScreen({ navigation }: any) {

  async function handleLogout() {
    await removerToken();
    navigation.replace('Login');
  }

  function handleCriarHabito() {
    navigation.navigate('CriarHabito');
  }

  return (
    <LinearGradient
      colors={[COLORS.primary, '#151D1B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >

      <Text style={styles.title}>
        Olá
      </Text>

      <Text style={styles.subtitle}>
        Meu app
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleCriarHabito}
      >
        <Text style={styles.addButtonText}>
          +
        </Text>
      </TouchableOpacity>

    </LinearGradient>
  );
}