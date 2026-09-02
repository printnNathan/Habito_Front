import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '##39E58C',
  secondary: '#2ecc71',
  background: '#f5f5f5',
  text: '#333',
}
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
});