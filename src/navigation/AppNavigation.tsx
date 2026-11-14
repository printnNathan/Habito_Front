import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen, { PlaceholderScreen } from '../screens/home/HomeScreen';
import CriarHabitoScreen from '../screens/criarHabitoScreen/CriarHabitoScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return <NavigationContainer><Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Jornada" component={PlaceholderScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Insights" component={PlaceholderScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Perfil" component={PlaceholderScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CriarHabito" component={CriarHabitoScreen} options={{ title: 'Novo hábito', headerStyle: { backgroundColor: '#111513' }, headerTintColor: '#F5F7F5', headerShadowVisible: false }} />
  </Stack.Navigator></NavigationContainer>;
}
