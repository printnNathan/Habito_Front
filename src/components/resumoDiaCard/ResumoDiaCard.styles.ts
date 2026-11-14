import { StyleSheet } from 'react-native';

export const RING = {
  size: 96,
  stroke: 10,
  trackColor: 'rgba(255,255,255,0.18)',
  progressColor: '#FFFFFF',
};

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 20,
    marginBottom: 16,
  },
  ringWrapper: {
    width: RING.size,
    height: RING.size,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringLabel: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  textos: {
    flex: 1,
    marginLeft: 20,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  mensagem: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 14,
    lineHeight: 20,
  },
});