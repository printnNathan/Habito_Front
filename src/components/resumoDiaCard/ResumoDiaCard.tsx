import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { RING, styles } from './ResumoDiaCard.styles';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DURACAO_MS = 600;

type Props = {
  total: number;
  concluidos: number;
};

function gerarTitulo(total: number, concluidos: number) {
  const palavra = total === 1 ? 'hábito concluído' : 'hábitos concluídos';
  return `${concluidos} de ${total} ${palavra}`;
}

function gerarMensagem(total: number, concluidos: number) {
  const restantes = total - concluidos;

  if (total === 0) return 'Nenhum hábito para hoje. Toque no + para criar o primeiro.';
  if (restantes === 0) return 'Dia fechado! Você concluiu todos os hábitos de hoje.';
  if (restantes === 1) return 'Falta só um passo para fechar o dia.';
  return `Você está no ritmo. Faltam ${restantes} passos para fechar o dia.`;
}

export default function ResumoDiaCard({ total, concluidos }: Props) {
  const { size, stroke, trackColor, progressColor } = RING;

  const raio = (size - stroke) / 2;
  const circunferencia = 2 * Math.PI * raio;

  const progresso = total > 0 ? concluidos / total : 0;

  const animado = useRef(new Animated.Value(0)).current;
  const [percentual, setPercentual] = useState(0);

  useEffect(() => {
    Animated.timing(animado, {
      toValue: progresso,
      duration: DURACAO_MS,
      easing: Easing.out(Easing.cubic), 
      useNativeDriver: false, 
    }).start();
  }, [progresso, animado]);


  useEffect(() => {
    const id = animado.addListener(({ value }) => {
      setPercentual(Math.round(value * 100));
    });
    return () => animado.removeListener(id);
  }, [animado]);

  const offset = animado.interpolate({
    inputRange: [0, 1],
    outputRange: [circunferencia, 0],
  });

  return (
    <View style={styles.card}>
      <View style={styles.ringWrapper}>
        <Svg width={size} height={size}>
          {/* Trilho de fundo */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={raio}
            stroke={trackColor}
            strokeWidth={stroke}
            fill="none"
          />
          
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={raio}
            stroke={progressColor}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circunferencia}
            strokeDashoffset={offset}
            rotation={-90}
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        <Text style={styles.ringLabel}>{percentual}%</Text>
      </View>

      <View style={styles.textos}>
        <Text style={styles.titulo}>{gerarTitulo(total, concluidos)}</Text>
        <Text style={styles.mensagem}>{gerarMensagem(total, concluidos)}</Text>
      </View>
    </View>
  );
}