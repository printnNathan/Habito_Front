import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#9c8080',
  secondary: '#ffffff',
  background: '#ffffff',
  text: '#ffffff',
};

export const styles = StyleSheet.create({
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
    color: '#78c796c5',
    marginBottom: 24,
    textAlign: 'center',
  },

  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: COLORS.primary,

    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonText: {
    fontSize: 32,
    color: '#0a0a0a',
    fontWeight: 'bold',
  },

  loader: {
    marginTop: 24,
  },

  listaHabitos: {
    width: '100%',
    marginTop: 250,
  },

  listaHabitosContent: {
    paddingHorizontal: 4,
    paddingBottom: 100,
  },

  emptyText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 20,
  },

  habitoNome: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  habitoData: {
    color: '#ccc',
    marginTop: 4,
  },
  habitoCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  habitoInfo: {
    flex: 1,
    marginLeft: 12,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxMarcado: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  checkboxIcone: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  habitoNomeConcluido: {
    textDecorationLine: 'line-through',
    color: '#1a1919',
  },
});