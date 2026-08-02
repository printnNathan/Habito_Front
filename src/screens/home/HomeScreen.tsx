import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { removerToken } from '../../storage/tokenStorage';

export default function HomeScreen({ navigation }: any) {
  async function handleLogout() {
    await removerToken();
    navigation.replace('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login realizado com sucesso 🎉</Text>
      <Text style={styles.subtitle}>Essa é a HomeScreen de teste.</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
});
